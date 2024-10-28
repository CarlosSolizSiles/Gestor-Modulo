import React, { useState } from 'react';
import './sidebar.css';

function Sidebar({ changeUrl, lists_url }) {
    // Estado para controlar qué sección está activa
    const [activeSection, setActiveSection] = useState(0);
    const [openSections, setOpenSections] = useState({});

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
            <div className="windows-btn">
                {lists_url.map(({ sectionTitle, sectionKey }, i) => (
                    <button
                        key={i}
                        onClick={() => activateSection(i)}
                        className={activeSection === sectionKey ? 'active-tab' : ''}
                    >
                        <h3>{sectionTitle}</h3>
                    </button>
                ))}
            </div>

            {lists_url.map(({ sectionKey, subSections }, i) => {
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
        </div>
    );
}

export default Sidebar;
