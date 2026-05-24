import imgLogo from "../../../assets/img/Logo_Restaurante.png";
import { AvatarUser } from "../../ui/AvatarUser"

export const Navbar = () => {
  return (
    <nav className="bg-blue-900 shadow-md sticky top-0 z-50 border-b border-black h-16 w-full flex items-center">
      <div className="w-full max-w-full mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo + título */}
        <div className="flex items-center gap-4">
          <img
            src={imgLogo}
            alt="Gestor Logo"
            className="h-8 md:h-12 w-auto object-contain"
          />

          <h1 className="font-bold text-white text-lg md:text-xl">
            Urban Central Admin
          </h1>
        </div>

        {/* Avatar placeholder */}
        <AvatarUser />

      </div>
    </nav>
  );
};