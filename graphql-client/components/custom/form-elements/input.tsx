import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

interface Props
  extends Omit<InputProps, "form" | "name" | "label" | "placeholder"> {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function InputElement({
  form,
  name,
  label,
  placeholder,
  disabled,
  onFocus,
  ...props
}: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("w-full", {
            "space-y-2": (label?.length ?? 0) > 0,
            "space-y-0": (label?.length ?? 0) === 0,
          })}
        >
          <FormLabel>
            <div className="truncate flex w-full justify-start">
              <span className="text-[13px]">{label}</span>
            </div>
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              disabled={disabled}
              onFocus={(e) => {
                onFocus?.(e);
              }}
              {...field}
              {...props}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage className="pt-2" />
        </FormItem>
      )}
    />
  );
}

export default InputElement;
