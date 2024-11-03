import Image from "next/image"

export default function LoginPage() {
    return (
        <div className="flex flex-row gap-6 justify-between p-6 mr-3 ml-6">
            
            <Image className="absolute" src="/assets/GHAST.svg" alt="Ghast" width={200} height={200} />
            
            {/* Div Esquerda */}
            <div className="flex flex-col mt-16 items-center justify-center flex-1 gap-20">
                {/* Bem-Vindo */}
                <div>
                    <h1>Olá, bem vindo! 👋</h1>
                    <p className="mt-10">Para acessa a plataforma, por favor realize o login.</p>
                </div>

                {/* Login Form */}
                <div className="flex flex-col min-w-96" >
                    <label htmlFor="Email" className="p-2">Email:</label>
                    <input type="text" placeholder="Insira seu E-mail" className="p-2 w-full rounded-lg" />
                    <label htmlFor="Senha" className="p-2">Senha:</label>
                    <input type="password" placeholder="Insira sua Senha" className="p-2 w-full rounded-lg" />
                    <button className="mt-6 p-2 w-full rounded-lg bg-primary text-primary-foreground">Login</button>
                </div>
            </div>

            {/* Imagem */}
            <div className="flex justify-end">
                <Image src="/assets/LoginArt.svg" alt="Gengar" width={680} height={680} />
            </div>
        </div>
    )
}