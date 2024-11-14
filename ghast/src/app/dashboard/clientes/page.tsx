import {
  FaUser,
  FaUsers,
  FaHeart,
  FaUserCircle,
  FaSearch,
  FaPhoneAlt,
  FaEnvelope,
  FaBriefcase,
  FaMedal,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

const filtros = [
  {
    nome: "Total de Usuarios",
    icone: FaUsers,
    quantidade: "250",
    cor: "bg-[#CB3CFF]/20",
    iconeCor: "text-[#CB3CFF]",
  },
  {
    nome: "Novos Usuarios",
    icone: FaUser,
    quantidade: "15",
    cor: "bg-[#FDB52A]/20",
    iconeCor: "text-[#FDB52A]",
  },
  {
    nome: "VIP",
    icone: FaHeart,
    quantidade: "200",
    cor: "bg-[#05C168]/20",
    iconeCor: "text-[#05C168]",
  },
  {
    nome: "Padrão",
    icone: FaUserCircle,
    quantidade: "35",
    cor: "bg-[#086CD9]/20",
    iconeCor: "text-[#086CD9]",
  },
];

const campos = [
  {
    nome: "Nome",
    icone: FaUser,
  },
  {
    nome: "Telefone",
    icone: FaPhoneAlt,
  },
  {
    nome: "Email",
    icone: FaEnvelope,
  },
  {
    nome: "Tipo",
    icone: FaBriefcase,
  },

  {
    nome: "Fidelidade",
    icone: FaMedal,
  },
];

export default function Clientes() {
  return (
    <div className="bg-[#EFF2F4] dark:bg-dark-main flex flex-col h-full w-full p-8 gap-7">
      <div className="flex flex-wrap gap-8 items-center">
        {filtros.map((filtro, index) => (
          <button
            key={index}
            className="flex-1 flex items-center justify-between border dark:bg-darkSecond p-4  rounded-md h-[80px] w-full"
          >
            <div className="flex flex-row items-center gap-2">
              <div className={`${filtro.cor} rounded-full p-3`}>
                {<filtro.icone className={`${filtro.iconeCor} text-xl`} />}
              </div>
              <div className="flex-col flex items-start justify-items-start">
                <span className="font-medium">{filtro.nome}</span>
                <div className="font-extralight text-sm text-gray-400">
                  {filtro.quantidade}
                </div>
              </div>
            </div>
            <span className="rotate-90 font-bold">...</span>
          </button>
        ))}
        <div className="relative flex items-center min-w-[278px]">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            className="p-2 pl-10 dark:bg-darkSecond border  rounded-sm w-full"
            placeholder="Procurar"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col border  rounded-md">
        <div className="flex justify-between p-6 border-b-2">
          <h1 className="font-semibold text-2xl text-black dark:text-white">
            Clientes
          </h1>
          <p>
            <span className="text-[#CB3CFF]">1-10</span> of 256
          </p>
        </div>
        <div className="flex xl:pl-10">
          {campos.map((campo, index) => (
            <div
              key={index}
              className="flex-1 flex flex-row p-4 gap-1 items-center"
            >
              {<campo.icone className="" />}
              <h1 className="font-semibold text-sm text-black dark:text-white">
                {campo.nome}
              </h1>
              <div className="flex flex-col ml-2">
                <button className="text-gray-500 hover:text-gray-800">
                  <FaChevronUp size={10} />
                </button>
                <button className="text-gray-500 hover:text-gray-800">
                  <FaChevronDown size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex-col">
          <div className="flex border-t p-4"> campos </div>
          <div className="flex border-t p-5"> campos </div>
          <div className="flex border-t p-5"> campos </div>
          <div className="flex border-t p-5"> campos </div>
          <div className="flex border-t p-5"> campos </div>
          <div className="flex border-t p-5"> campos </div>
          <div className="flex border-t p-5"> campos </div>
          <div className="flex border-t p-5"> campos </div>
          <div className="flex border-t p-5"> campos </div>
        </div>
      </div>

      <footer className="flex justify-between">
        <p>
          <span className="text-[#CB3CFF]">1-10</span> of 256
        </p>
        <div>Itens por pagina</div>
      </footer>
    </div>
  );
}
