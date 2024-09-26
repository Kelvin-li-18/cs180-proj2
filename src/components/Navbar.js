function Navbar({ parentSections }) {
  return (
    <nav className="w-64 h-screen fixed bg-black text-gray-300 border-r border-gray-700">
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-indigo-500 text-center">Image Filters</h2>
        <ul className="space-y-6">
          {parentSections.map((parent) => (
            <li key={parent.id} className="group">
              <a
                href={`#${parent.id}`}
                className="relative block text-xl py-2 transition-colors duration-300 hover:text-indigo-500"
              >
                {parent.title}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <ul className="pl-4 mt-2 space-y-3">
                {parent.sections.map((section) => (
                  <li key={section.id} className="group">
                    <a
                      href={`#${section.id}`}
                      className="relative block text-lg text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                    >
                      {section.title}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}



export default Navbar;
