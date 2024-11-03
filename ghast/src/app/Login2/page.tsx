import Image from "next/image";
import { SocialLoginButtonProps,InputFieldProps } from "@/@types/props";

export default function LoginPage2() {
    return (
        // Container principal
        <div className="flex bg-[url('/assets/BgBrancoMassa.svg')] lg:flex-row items-center justify-center min-h-screen p-6 lg:p-10">
            {/* conteudo principal */}
            <div className="flex bg-white rounded-xl shadow-lg">
                
                {/* Gengar */}
                <div className="overflow-hidden rounded-tl-xl rounded-bl-xl">
                    <Image src="/assets/gengarNormal.svg" alt="Gengar" width={500} height={500} />
                </div>
                
                {/* Lado direito */}
                <div className="flex flex-col items-center justify-center p-8 lg:px-12 rounded-xl max-w-md w-full space-y-6">
                    
                    <div className="flex gap-4 justify-center items-center select-none pointer-events-none flex-col">
                        <Image src="/assets/GHAST.svg" alt="Ghast" width={150} height={150} />
                        <p>_______________________________________</p>
                    </div>

                    {/* Mensagem de boas-vindas */}
                    <div className="text-center lg:text-center">
                        <h1 className="text-3xl font-bold">Bem-vindo de volta!</h1>
                        <p className="text-gray-600 mt-2">Para acessar a plataforma, por favor realize o login.</p>
                    </div>

                    {/* Formulário */}
                    <form className="w-full space-y-4">
                        <InputField id="usuario" label="Usuário" placeholder="Digite seu nome de usuário"/>
                        <InputField id="password" label="Senha" placeholder="Digite sua senha" type="password"/>
                        <ForgotPasswordLink />
                        <br />
                        <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg hover:bg-slate-800 transition duration-300">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
}

function InputField({ id, label, placeholder, type = "text" ,required }: InputFieldProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="mb-1 text-gray-600">{label}</label>
            <input type={type} id={id} placeholder={placeholder} required className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full" />
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
