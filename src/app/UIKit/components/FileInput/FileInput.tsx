import { useEffect, useId, useMemo, useState, type ChangeEvent, type DragEvent } from "react";
import Image from "next/image";
import styles from "./FileInput.module.css";
import { UploadIcon } from "../icons/UploadIcon";
import { CloseIcon } from "../icons/CloseIcon";

type Props = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  className?: string;
  onFilesChange?: (files: File[]) => void;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
};

export const FileInput = ({
  label,
  hint,
  error,
  required,
  accept,
  multiple = false,
  className,
  onFilesChange,
}: Props) => {
  const inputId = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const previewUrls = useMemo(
    () => files.map((file) => (file.type.startsWith("image/") ? URL.createObjectURL(file) : null)),
    [files],
  );

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const updateFiles = (next: File[]) => {
    setFiles(next);
    onFilesChange?.(next);
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;
    const incomingList = Array.from(incoming);
    updateFiles(multiple ? [...files, ...incomingList] : incomingList.slice(0, 1));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    addFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    updateFiles(files.filter((_, fileIndex) => fileIndex !== index));
  };

  const singlePreviewUrl = !multiple && files.length === 1 ? previewUrls[0] : null;

  const dropzoneClasses = [
    styles.dropzone,
    singlePreviewUrl && styles.dropzoneLoaded,
    isDragging && styles.dropzoneDragging,
    error && styles.dropzoneError,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <label
        htmlFor={inputId}
        className={dropzoneClasses}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {singlePreviewUrl ? (
          <>
            <span className={styles.previewThumbWrap}>
              <Image
                src={singlePreviewUrl}
                alt=""
                width={40}
                height={40}
                unoptimized
                className={styles.previewThumb}
              />
              <button
                type="button"
                className={styles.previewRemoveBadge}
                aria-label={`Удалить ${files[0].name}`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  removeFile(0);
                }}
              >
                <CloseIcon />
              </button>
            </span>
            <span className={styles.replaceText}>Нажмите или перетащите, чтобы заменить фото</span>
          </>
        ) : (
          <>
            <UploadIcon />
            <span className={styles.dropzoneText}>Перетащите файл сюда или нажмите для выбора</span>
            {hint && <span className={styles.hint}>{hint}</span>}
          </>
        )}
      </label>

      <input
        id={inputId}
        type="file"
        className={styles.hiddenInput}
        accept={accept}
        multiple={multiple}
        required={required}
        aria-invalid={Boolean(error)}
        onChange={handleChange}
      />

      {!singlePreviewUrl && files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((file, index) => (
            <li key={`${file.name}-${file.lastModified}-${index}`} className={styles.fileChip}>
              {previewUrls[index] ? (
                <Image
                  src={previewUrls[index]}
                  alt=""
                  width={32}
                  height={32}
                  unoptimized
                  className={styles.thumb}
                />
              ) : null}
              <span className={styles.fileMeta}>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
              </span>
              <button
                type="button"
                className={styles.removeBtn}
                aria-label={`Удалить ${file.name}`}
                onClick={() => removeFile(index)}
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
