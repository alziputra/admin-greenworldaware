/* eslint-disable react/prop-types */
import { Label } from 'flowbite-react';
import { createContext, useEffect, useState } from 'react';
import { FaCloudArrowUp } from 'react-icons/fa6';

const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId, setFileUrl, fileUrl }) {
  const [loaded, setLoaded] = useState(false);
  const [cloudinaryWidget, setCloudinaryWidget] = useState(null);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById('uw');
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement('script');
        script.async = true;
        script.id = 'uw';
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }

    return () => {
      // Cleanup function: destroy the Cloudinary widget when the component unmounts
      cloudinaryWidget?.destroy();
    };
  }, [loaded, cloudinaryWidget]);

  const initializeCloudinaryWidget = () => {
    if (loaded && !cloudinaryWidget) {
      const newWidget = window.cloudinary.createUploadWidget(uwConfig, (error, result) => {
        if (!error && result && result.event === 'success') {
          setPublicId(result.info.public_id);
          console.log(setPublicId(result.info.public_id));
          setFileUrl(result.info.secure_url);
        }
      });

      setCloudinaryWidget(newWidget);

      document.getElementById('upload_widget').addEventListener('click', () => {
        newWidget.open();
      });
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <div id="upload_widget" onClick={initializeCloudinaryWidget}>
        <Label
          htmlFor="dropzone-file"
          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {fileUrl ? (
            <img className="object-cover rounded w-full h-full overflow-hidden" src={fileUrl} alt="image" />
          ) : (
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <FaCloudArrowUp className="text-3xl" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
          )}
          {/* <FileInput id="dropzone-file" className="hidden" /> */}
        </Label>
      </div>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
