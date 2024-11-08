import React, { useLayoutEffect, useState } from 'react';
import '../assets/sidebar.css';
import { enviarCambioModo } from '../lib/enviarCambioModo';

function Sidebar({ changeUrl, lists_url }) {
    // Estado para controlar qué sección está activa
    const [activeSection, setActiveSection] = useState(0);
    const [openSections, setOpenSections] = useState({});

    // Estado para manejar el modo oscuro
    const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.darkMode ?? false));

    useLayoutEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        enviarCambioModo(isDarkMode);
    }, [])

    // Función para cambiar el modo oscuro
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
        localStorage.darkMode = !isDarkMode;
        enviarCambioModo(!isDarkMode);
    };

    // Función para activar una sección
    const activateSection = (sectionKey) => {
        setActiveSection(sectionKey);
        setOpenSections({}); // Cerrar todas las secciones al cambiar de pestaña
    };

    // Función para alternar el estado de cada menú desplegable
    const toggleSection = (sectionKey) => {
        setOpenSections(prevState => ({
            ...prevState,
            [sectionKey]: !prevState[sectionKey],
        }));
    };

    return (
        <div className="sidebar">
            <header className="windows-btn">
                {lists_url.map(({ sectionTitle, sectionKey }, i) => (
                    <button
                        key={i}
                        onClick={() => activateSection(i)}
                        className={activeSection === sectionKey ? 'active-tab' : ''}
                    >
                        <h3>{sectionTitle}</h3>
                    </button>
                ))}
            </header>
            <main className=''>
                {lists_url.map(({ subSections }, i) => {
                    if (activeSection !== i) return null;

                    return (
                        <div className="dropdown" key={i}>
                            {subSections.map(({ subSectionTitle, subLinks }, j) => (
                                <React.Fragment key={j}>
                                    <h4
                                        onClick={() => toggleSection(subSectionTitle)}
                                        className="dropdown-header"
                                    >
                                        {subSectionTitle} {openSections[subSectionTitle] ? '-' : '+'}
                                    </h4>
                                    {openSections[subSectionTitle] && (
                                        <div className="dropdown-content">
                                            {subLinks?.map((linkGroup, k) => (
                                                <div key={k}>
                                                    <h5 className="link-group-title">{linkGroup.section}</h5>
                                                    {linkGroup.links.map(({ url, linkName }, l) => (
                                                        <button key={l} onClick={() => changeUrl(url)}>
                                                            {linkName}
                                                        </button>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    );
                })}
            </main>
            <footer>
                <button id="dark-mode-toggle" className="dark-mode-btn"
                    onClick={() => {
                        toggleDarkMode()
                    }}>Modo</button>
            </footer>
        </div>
    );
}

export default Sidebar;
