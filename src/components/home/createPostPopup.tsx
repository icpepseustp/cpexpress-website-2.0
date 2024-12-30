import { useState } from 'react';
import Image from 'next/image';
import { homeContent } from '@/content/home/home.content';
import { getSessionUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { createDocument, readDocument } from '@/server/firestoreservice';
import { uploadFile } from '@/server/storageservice';

interface CreatePostPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostPopup: React.FC<CreatePostPopupProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getSessionUser();
    if (!user) {
      router.push('/'); 
      return;
    }

    try {
      const currentUser = await readDocument('users', 'uniqueID');
      const userAvatar = currentUser[0].photo || '';
      setIsLoading(true);
      
      const imageName = `postImages/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.jpg`;
      const response = await fetch(selectedImage!);
      const blob = await response.blob();
      const imageUrl = selectedImage && await uploadFile(imageName, blob);

      const newPost = {
        userId: user.userID,
        username: user.username || '',
        likes: 0,
        caption: caption,
        photo: imageUrl || '', 
        timestamp: Date.now(),
        avatar: userAvatar,
      };
      createDocument('posts', newPost);
      setCaption('');
      setSelectedImage(null);
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-brandDark bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-brandDark shadow-2xl rounded-xl p-6 w-[90%] max-w-lg">
        <div className="flex items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full border-2 w-7 h-7 border-brandDark">
              {/* TODO: Add user avatar image */}
            </div>
            <h1 className="text-brandDark font-medium">Habibi</h1>
          </div>
        </div>

        <form onSubmit={handleCreatePost} className="space-y-6">
          <div className="space-y-4">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-3 text-lg focus:outline-none resize-none min-h-[120px]"
              placeholder="Share your thoughts..."
              rows={4}
            />
            <div className="border-b-2 border-brandDark"></div>
          </div>

          {selectedImage && (
            <div className="border-2 border-brandDark rounded-xl relative h-[400px]">
              <Image
                src={selectedImage}
                alt="Selected"
                fill
                className="object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-white border-2 border-brandDark rounded-full w-6 h-6 flex items-center justify-center hover:bg-brandLight/20 text-sm"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer p-2 hover:bg-brandLight/20 rounded-full"
            >
              <Image src={homeContent.galleryIcon} width={35} alt="Upload Photo" />
            </label>
            <div className="flex-1 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border-2 border-brandDark rounded-full hover:bg-brandLight/20 text-brandDark"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!caption.trim() || isLoading}
                className="px-4 py-2 border-4 border-brandDark rounded-full hover:bg-brandLight/20 text-brandDark font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPopup;
