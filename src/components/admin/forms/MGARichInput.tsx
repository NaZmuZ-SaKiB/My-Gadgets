import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type TProps = {
  name: string;
  label: string;
  placeholder?: string;
  height?: string;
};

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

const MGARichInput = ({
  name,
  label,
  placeholder,
  height = "300px",
}: TProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, field: { ref } }) => (
        <FormItem className="flex w-full flex-col gap-1">
          <FormLabel className="text-xs font-medium">{label}</FormLabel>
          <FormControl>
            <SunEditor
              {...field}
              defaultValue={field.value}
              onChange={(content) => field.onChange(content)}
              placeholder={placeholder || label}
              height={height}
              setOptions={{
                buttonList: [
                  ["undo", "redo"],
                  ["font", "fontSize", "formatBlock"],
                  ["paragraphStyle", "blockquote"],
                  ["bold", "underline", "italic"],
                  ["strike", "subscript", "superscript"],
                  ["fontColor", "hiliteColor" /* "textStyle"*/],
                  ["removeFormat"],
                  //   "/", // Line break
                  ["outdent", "indent"],
                  ["align", "horizontalRule", "list", "lineHeight"],
                  ["table", "link", "image", "video" /** "audio" ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                  /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                  ["fullScreen", "showBlocks", "codeView"],
                  ["preview", "print"],
                  ["save", "template"],
                  /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
                ],
              }}
            />
          </FormControl>
          <FormMessage className="!mt-0 font-normal" />
        </FormItem>
      )}
    />
  );
};

export default MGARichInput;
