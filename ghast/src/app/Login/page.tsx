import Image from "next/image";
import { SocialLoginButtonProps, InputFieldProps } from "@/lib/props";

export default function LoginPage() {
  return (
    // Container principal
    <div className="flex flex-col items-center justify-center min-h-screen p-6 lg:p-10 bg-[url('/assets/BgBrancoMassa.svg')] dark:bg-[url('/assets/BgRoxo.svg')] bg-cover bg-center">
      {/* Conteúdo principal */}
      <div className="flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-lg max-w-screen-lg w-full">
        {/* Gengar para telas maiores */}
        <div className="hidden lg:flex rounded-tl-xl rounded-bl-xl overflow-hidden">
          <Image
            src="/assets/gengarNormal.svg"
            alt="Gengar"
            width={500}
            height={500}
          />
        </div>

        {/* Lado direito */}
        <div className="flex flex-col items-center justify-center p-8 lg:px-12 rounded-xl w-full lg:w-[50%] space-y-6">
          <div className="flex flex-col items-center gap-4 select-none pointer-events-none">
            <Image
              src="/assets/GHAST.svg"
              alt="Ghast"
              width={150}
              height={150}
            />

            {/* Gengar para dispositivos móveis */}
            <div className="flex mt-4 mb-8 lg:hidden">
              <Image
                src="/assets/gengarMobile.svg"
                alt="Gengar"
                width={300}
                height={300}
              />
            </div>
          </div>

          {/* Linha reta entre imagem e seja bem vindo */}
          <div className="border w-full h-[2px] border-black"></div>

          {/* Mensagem de boas-vindas */}
          <div className="text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-black">
              Bem-vindo de volta!
            </h1>
            <p className="text-gray-600 mt-2 text-sm lg:text-base">
              Para acessar a plataforma, por favor realize o login.
            </p>
          </div>

          {/* Formulário */}
          <form className="w-full space-y-4">
            <InputField
              id="usuario"
              label="Usuário"
              placeholder="Digite seu nome de usuário"
            />
            <InputField
              id="password"
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
            />
            <ForgotPasswordLink />
            <br />
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-slate-800 transition duration-300"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({
  id,
  label,
  placeholder,
  type = "text",
  required,
}: InputFieldProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-gray-600">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required
        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-full bg-white"
      />
    </div>
  );
}

function ForgotPasswordLink() {
  return (
    <div className="text-center mt-4">
      <a
        href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
        className="text-blue-700 hover:underline text-sm lg:text-base"
      >
        Esqueceu a senha?
      </a>
    </div>
  );
}
