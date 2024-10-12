import { Input } from "@/system/ui/input";
import { createRef, FC } from "react";
import { Upload } from "lucide-react";

const FileInputButton: FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  const inputRef = createRef<HTMLInputElement>();

  return (
    <div className="grid w-full max-w-sm cursor-pointer items-center gap-1.5">
      <Upload className="w-5" onClick={() => inputRef.current.click()} />
      <Input
        id="picture"
        className="hidden"
        type="file"
        ref={inputRef}
        {...props}
      />
    </div>
  );
};

export default FileInputButton;
