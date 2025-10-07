function Header() {
  return (
    <>
      <div className="w-full h-16 bg-gray-100 flex items-center justify-between px-0 sm:px-[54pt]">
        <div className="flex items-center" style={{ gap: '5px' }}>
          <img src="/logo.svg" alt="CipherBox" width={42} height={42} />
          <h1 className="text-gray-800" style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: '56px' }}>CIPHERBOX</h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-gray-800" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '16px', transform: 'skew(-10deg)' }}>By Yash Jani & Daniel Acosta</h1>
          <img src="/heart.svg" alt="Logo" width={24} height={24} />
        </div>
      </div>
    </>
  )
}

export default Header
