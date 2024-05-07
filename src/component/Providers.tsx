import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "../provider/AuthProvider";

export const Providers = ( { children }:any ) => {
    return (
      <NextUIProvider>
        <AuthProvider>
          {children}  
        </AuthProvider>
      </NextUIProvider>
      
    )
}