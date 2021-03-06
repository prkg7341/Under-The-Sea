import { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "../../../foundation/Icon/Icon";
import Image from "../Image/Image";
import LetterBox from "../letterBox/LetterBox";
import {
  Description,
  ErrorLayOut,
  errVariants,
  LayOut,
  Title,
} from "./ImageInput.styled";
import { IImageInput } from "./ImageInput.types";

export const ImageInput = ({
  isDark,
  errMessage,
  title,
  onChange,
}: IImageInput) => {
  const defaultDesc = "Click here or Drag & Drop";
  const [desc, setDesc] = useState(defaultDesc);
  const [imgSrc, setImgSrc] = useState("");

  const readFile = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => resolve(reader.result as string),
        false
      );
      reader.readAsDataURL(file);
    });
  };

  const isSrcImage = (src: string) => {
    return src.split("/")[0] === "data:image";
  };

  return (
    <Dropzone
      onDragEnter={() => setDesc("Leave your file here")}
      onDragLeave={() => setDesc(defaultDesc)}
      onDrop={async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const src = await readFile(file);
        setImgSrc(src);
        onChange(file);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <LayOut errMessage={errMessage} isDark={isDark} {...getRootProps()}>
          <input {...getInputProps()} type="file" accept="image/*" />
          {imgSrc ? (
            isSrcImage(imgSrc) ? (
              <Image width="180px" height="180px" shape="round" src={imgSrc} />
            ) : (
              <>
                <LetterBox size="h1" weight="bold" color="primary">
                  π­
                </LetterBox>
                <LetterBox size="body2" weight="bold" color="shade">
                  μ΄λ―Έμ§ νμΌμ΄ μλκ±° κ°μμ
                </LetterBox>
              </>
            )
          ) : (
            <Icon
              size={36}
              name="image"
              color={isDark ? "shade" : "primary"}
            ></Icon>
          )}
          <Title>{title}</Title>
          {errMessage && (
            <ErrorLayOut
              key={errMessage}
              variants={errVariants}
              initial="initial"
              animate="entry"
              exit="exit"
            >
              <LetterBox size="body2">{errMessage}</LetterBox>
            </ErrorLayOut>
          )}
          <Description>{desc}</Description>
        </LayOut>
      )}
    </Dropzone>
    // <Dropzone
    //   onDrop={(acceptedFiles) => {
    //     props.onChange(acceptedFiles);
    //   }}
    //   ref={imgRef}
    // >
    //   {({ getRootProps, getInputProps }) => (
    //     <Layout {...getRootProps()} {...props}>
    //       <input {...getInputProps()} type="file" accept="image/*" />
    //       <Icon icon="image" />
    //       <Title>μ΄λ―Έμ§λ₯Ό μλ‘λνμΈμ</Title>
    //       <Description>
    //         μ¬κΈ°λ₯Ό ν΄λ¦­νκ±°λ νμΌμ λ§μ°μ€λ‘ λμ΄λ³΄μΈμ.
    //       </Description>
    //     </Layout>
    //   )}
    // </Dropzone>
  );
};
