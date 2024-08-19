import { Input } from "@/system/ui/input";
import { Label } from "@/system/ui/label";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FileInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        {label && <Label htmlFor="picture">{label}</Label>}
        <Input id="picture" type="file" ref={ref} {...props} />
      </div>
    );
  },
);

export default FileInput;
