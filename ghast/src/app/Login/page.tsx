import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface InputFieldProps {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
}

interface SocialLoginButtonProps {
    icon: React.ReactNode;
    text: string;
}

export default function LoginPage() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-6 lg:p-10 bg-gray-50">

            {/* Logo visível apenas em telas grandes */}
            <div className="hidden lg:flex absolute top-5 left-5 select-none pointer-events-none">
                <Image src="/assets/GHAST.svg" alt="Ghast" width={150} height={150} />
            </div>

            <div className="lg:hidden">
            <Image src="/assets/GHAST.svg" alt="Ghast" width={150} height={150} />
            </div>

            {/* Imagem do Gengar para mobile */}
            <div className="flex mt-4 mb-8 lg:hidden select-none pointer-events-none">
                <Image src="/assets/gengarMobile.svg" alt="Gengar" width={500} height={500} />
            </div>

            {/* Área principal de conteúdo */}
            <div className="flex flex-col lg:flex-row items-center justify-between max-w-screen-lg w-full space-y-6 lg:space-y-0 lg:space-x-16">
                
                {/* Formulário de Login */}
                <div className="flex flex-col items-center lg:items-start justify-center p-8 lg:px-12 bg-white shadow-lg rounded-xl max-w-md w-full space-y-6">
                    
                    {/* Mensagem de boas-vindas */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold">Olá, bem-vindo! 👋</h1>
                        <p className="text-gray-600 mt-2">Para acessar a plataforma, por favor realize o login.</p>
                    </div>

                    {/* Formulário */}
                    <form className="w-full space-y-4">
                        <InputField id="email" label="Email" placeholder="Digite seu email" />
                        <InputField id="password" label="Senha" placeholder="Digite sua senha" type="password" />
                        <button type="submit" className="w-full py-3 mt-4 bg-primary text-white rounded-lg hover:bg-slate-800 transition duration-300">
                            Entrar
                        </button>
                        <ForgotPasswordLink />
                    </form>

                    {/* Opções de login social */}
                    <div className="w-full border-t pt-4 space-y-4">
                        <SocialLoginButton icon={<FcGoogle size={20} />} text="Entrar com Google" />
                        <SocialLoginButton icon={<FaFacebook size={20} className="text-blue-600" />} text="Entrar com Facebook" />
                    </div>

                    {/* Link de cadastro */}
                    <CadastroLink />
                </div>

                {/* Imagem do Gengar para telas grandes */}
                <div className="flex-1 hidden lg:flex justify-center select-none pointer-events-none">
                    <Image src="/assets/LoginArt.svg" alt="Gengar" width={500} height={500} />
                </div>

            </div>
        </div>
    );
}

function InputField({ id, label, placeholder, type = "text" }: InputFieldProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="mb-1 text-gray-600">{label}</label>
            <input type={type} id={id} placeholder={placeholder} className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full" />
        </div>
    );
}

function ForgotPasswordLink() {
    return (
        <div className="text-center mt-4">
            <a href="#" className="text-blue-700 hover:underline">Esqueceu a senha?</a>
        </div>
    );
}

function SocialLoginButton({ icon, text }: SocialLoginButtonProps) {
    return (
        <button className="flex items-center justify-center w-full py-3 bg-slate-100 text-black rounded-lg hover:bg-slate-200 transition duration-300 space-x-3">
            {icon}
            <span>{text}</span>
        </button>
    );
}

function CadastroLink() {
    return (
        <div className="text-center w-full pt-2">
            <p className="text-gray-600">
                Não possui uma conta? <a href="#" className="text-blue-700 hover:underline">Criar conta</a>
            </p>
        </div>
    );
}
