import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import diffFunction from "../diffFunction";
import { FollowersType, FollowingType } from "../types/types.d";
import { useFollowersContext } from "../context/FollowersContext";
import fileSvg from "../assets/file.svg";
import { ToastContainer, toast } from "react-toastify";
const notifyFileError = () => toast.error("Archivo equivocado", { theme: "dark", autoClose: 3000 });
const notifyMissingFiles = () => toast.error("Faltan archivos", { theme: "dark", autoClose: 3000 });

function FollowersView() {
  const {followersData, setFollowersData, followingData, setFollowingData, followersFileName, setFollowersFileName, followingFileName, setFollowingFileName} = useFollowersContext();
  const [result, setResult] = useState<string[]>([]);

  const handleClear = () => {
    setResult([]);
    setFollowersData({ title: "", media_list_data: [], string_list_data: [] });
    setFollowingData({ relationships_following: [] });
    setFollowersFileName("");
    setFollowingFileName("");
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (followersData?.media_list_data?.length !== 0 && followingData?.relationships_following?.length !== 0) {
      setResult(diffFunction(followersData, followingData));
    } else {
      notifyMissingFiles();
    }
  };

  const {
    getRootProps: getRootFollowersProps,
    getInputProps: getInputFollowersProps,
    isDragActive: isDragActiveFollowers,
  } = useDropzone({
    accept: { "application/json": [".json"] },
    onDrop: useCallback((acceptedFiles: File[]) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (acceptedFiles[0].name !== "followers_1.json") {
          notifyFileError();
          return;
        }
        const result = event.target?.result;
        if (typeof result === "string") {
          try {
            const parsedJson: FollowersType["data"] = JSON.parse(result);
            setFollowersData(parsedJson);
            setFollowersFileName(acceptedFiles[0].name);
          } catch (error) {
            console.error("Error al parsear el JSON:", error);
          }
        } else {
          console.error("El archivo no se pudo leer correctamente.");
        }
      };

      if (acceptedFiles.length > 0) {
        reader.readAsText(acceptedFiles[0]);
      }
    }, []),
  });

  const {
    getRootProps: getRootFollowingProps,
    getInputProps: getInputFollowingProps,
    isDragActive: isDragActiveFollowing,
  } = useDropzone({
    accept: { "application/json": [".json"] },
    onDrop: useCallback((acceptedFiles: File[]) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (acceptedFiles[0].name !== "following.json") {
          notifyFileError();
          return;
        }
        const result = event.target?.result;
        if (typeof result === "string") {
          try {
            const parsedJson: FollowingType["data"] = JSON.parse(result);
            setFollowingData(parsedJson);
            setFollowingFileName(acceptedFiles[0].name);
          } catch (error) {
            console.error("Error al parsear el JSON:", error);
          }
        } else {
          console.error("El archivo no se pudo leer correctamente.");
        }
      };

      if (acceptedFiles.length > 0) {
        reader.readAsText(acceptedFiles[0]);
      }
    }, []),
  });

  return (
    <main className="flex p-8 main-bg flex-col items-center bg-[#0f0f0f] h-screen w-screen">
      <ToastContainer stacked position="bottom-right"/>
      <div className="p-10 h-full w-full flex flex-col items-center justify-center opacity-90 bg-[#2c2c2c]">
        <div className="w-full flex flex-col items-start mb-5 justify-center">
          <h1 className="text-white text-2xl mb-2">Comparador de seguidores</h1>
          <h2 className="text-white">Detecta quien te dejo de seguir, no sos fan de nadie</h2>
          <h2 className="text-white">Pasos para descargar los datos:</h2>
        </div>
        <form
          onSubmit={submitForm}
          className="h-full w-full flex flex-col justify-center items-center text-white"
        >
          <div className={`${result.length === 0 ? "" : "hidden"} h-full flex justify-around items-center gap-5 sm:gap-20`}>
            <div
              className="sm:w-[300px] h-[180px] sm:h-[300px] text-center flex items-center justify-center border border-dashed offse p-2 cursor-pointer"
              {...getRootFollowersProps()}
            >
              <input {...getInputFollowersProps()} />
              {followersFileName ? (
                <div className="flex flex-col items-center justify-center">
                  <img src={fileSvg} alt="file" className="w-28 h-28 mb-5" />
                  {followersFileName}
                </div>
              ) : isDragActiveFollowers ? (
                <p>Suelta el archivo ...</p>
              ) : (
                <p>Arrastra el archivo "followers_1"</p>
              )}
            </div>
            <div
              className="sm:w-[300px] h-[180px] sm:h-[300px] text-center flex items-center justify-center border border-dashed offse p-2 cursor-pointer"
              {...getRootFollowingProps()}
            >
              <input {...getInputFollowingProps()} />
              <h1 className="text-white">
                {followingFileName ? (
                  <div className="flex flex-col items-center justify-center">
                    <img src={fileSvg} alt="file" className="w-28 h-28 mb-5" />
                    {followingFileName}
                  </div>
                ) : isDragActiveFollowing ? (
                  <p>Suelta el archivo ...</p>
                ) : (
                  <p>Arrastra el archivo "following"</p>
                )}
              </h1>
            </div>
          </div>
            {/* <div className="bg-[#242424] min-w-2/3 p-3 max-w-2/3 min-h-[300px] max-h-[300px] overflow-y-scroll">
              {["ejemplo", "ejemplo2", "ejemplo3", "adasd","ejemplo", "ejemplo2", "ejemplo3", "adasd","ejemplo", "ejemplo2", "ejemplo3", "adasd"].map((follower) => (
                <h3 key={follower}>{follower}</h3>
              ))}
            </div> */}
            <div className={`${result.length === 0 ? "hidden" : ""} bg-[#242424] min-w-2/3 p-3 max-w-2/3 min-h-[300px] max-h-[300px] overflow-y-scroll`}>
              {result?.join(" ")}
            </div>
          <div className="m-10 gap-5 w-full flex items-center justify-center">
            <button className="px-5 py-2 rounded bg-neutral-600 cursor-pointer">
              Comparar
            </button>
            <button
              type="reset"
              onClick={handleClear}
              className="px-5 py-2 rounded bg-neutral-600 cursor-pointer"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default FollowersView;
