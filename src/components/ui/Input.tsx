import { HTMLInputTypeAttribute } from "react"
import { UseFormRegister } from "react-hook-form"

export type InputProps = {
    label?: string;
    id?: string;
    type?: HTMLInputTypeAttribute;
    register?: UseFormRegister<any>;
    error?: string;
    placeholder?: string;
    className?: string;
    name ?: string | undefined;
    onChange?: (e: any) => void;
  };

  export const Input = ({name, label,id = "taiKhoan",type = "text",register ,error , placeholder,onChange , className = "" } : InputProps) => {
    return (
      <div className={className}>
          {!!label && <label htmlFor="taiKhoan">{label}</label>}
                  <input
                      id={id}
                      type={type}
                      className="p-10 mt-8 w-full rounded-6  bg-[#F5F5F5]"
                      placeholder={placeholder}
                      // value={formValue}
                      name={name}
                      onChange = {onChange}
                      {...register?.(id)}
                  />
                  {!!error  && (
                      <p className="text-red-500 text-14 mt-2">
                          {error}
                      </p>
                  )}
      </div>
    )
  }



