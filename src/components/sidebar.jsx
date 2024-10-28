import React, { useState } from 'react';
import './Sidebar.css'; // Estilos para los desplegables

function Sidebar({ changeUrl, lists_url }) {
    // Estados para controlar si los desplegables están abiertos o cerrados
    const [abiertoABM, setAbiertoABM] = useState(false);
    const [abiertoPedidos, setAbiertoPedidos] = useState(false);

    // Funciones para alternar el estado de los desplegables
    const toggleABM = () => setAbiertoABM(!abiertoABM);
    const togglePedidos = () => setAbiertoPedidos(!abiertoPedidos);

    return (
        <div className="base-navbar">
            <div className="windows">
                <div className="windows-btn">
                    {
                        lists_url.map(({ name }, i) => {
                            return <button key={i}><h3>{name}</h3></button>
                        })
                    }
                </div>

                {lists_url.map(({ dir, links }) => {


                    return links.map(({ name, links }) => (<div className="dropdown" key={dir}>
                        <h4 onClick={togglePedidos} className="dropdown-header">
                            {name} {abiertoPedidos ? '-' : '+'}
                        </h4>
                        {abiertoPedidos && (
                            <div className="dropdown-content">
                                {links.map(({ link, name }) => <button onClick={() => changeUrl(link)}>{name}</button>)}
                            </div>
                        )}
                    </div>))
                })}

                {/* {changeMenu ?
                    (<div className="dropdown">
                        <h4 onClick={toggleABM} className="dropdown-header">
                            ABM {abiertoABM ? '-' : '+'}
                        </h4>
                        {abiertoABM && (
                            <div className="dropdown-content">
                                <a href="/abm/index.js">Enlace ABM</a>
                            </div>
                        )}
                    </div>) :


                    <div className="dropdown">
                        <h4 onClick={togglePedidos} className="dropdown-header">
                            Pedidos {abiertoPedidos ? '-' : '+'}
                        </h4>
                        {abiertoPedidos && (
                            <div className="dropdown-content">
                                <button onClick={() => changeUrl('public/panol-abm/ver')}>Enlace Pedidos</button>
                            </div>
                        )}
                    </div>
                } */}
            </div>
        </div>
    );
}

export default Sidebar;