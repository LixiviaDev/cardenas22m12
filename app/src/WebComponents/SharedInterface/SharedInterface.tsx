import React, { useEffect, useState } from 'react'
import './SharedInterface.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { LanguageManager } from '../../TypeScript/Managers/LanguageManager';
import configData from '../../config.json';
import { Languages } from '../../TypeScript/Enums/Language.enum';

export default function SharedInterface(props: any) {
    const [flexflow] = useState(props.flexflow ?? "column");
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const [mainReference] = useState<React.RefObject<HTMLElement>>(React.createRef());

    useEffect(() => componentDidMount(), []);

    useEffect(() => {
        if(mainReference.current != null){
        if(window.innerWidth < 600)
            mainReference.current.style.minHeight = window.innerHeight.toString() + "px";
        else
            mainReference.current.style.minHeight = "100vh";
        }
    }, [mainReference]);

    function componentDidMount() {
        isUserAdmin()
    }

    function logOut() {
        localStorage.removeItem("token");

        window.location.reload();
    }

    async function isUserAdmin() {
        let isAdmin = false;

        try
        {
            let bodyData = {
                token: localStorage.getItem("token")
            }

            let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
            }

            let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.IS_ADMIN}`, body);
            let data: any = await res.json();

            isAdmin = data?.isAdmin;
        }
        catch(ex)
        {
            console.error(ex);
        }

        setIsAdmin(isAdmin);
    }

    return(
        <>
        <header className="sharedInterface">
        <nav className="navbar navbar-light bg-light">
            <div className="w-100">
                <div className='w-100 d-flex justify-content-between m-0 px-2'>
                    <div className='d-flex justify-content-center align-items-center' style={{width: "40px"}}>
                        <a className='text-black fs-3' href="/">
                            <FontAwesomeIcon icon={faHome} />
                        </a>
                    </div>
                    <div className='d-flex'>
                        <form className="d-flex" action='/search' method='get'>
                            <input className="form-control me-2" type="search" title='search bar' placeholder={languageManager.get("Shared.SEARCH")} name='search' aria-label="Search"/>
                        </form>
                        {localStorage.getItem("token") == null ? 
                        <a className='p-0 px-2 text-center btn btn-light border border-dark d-flex justify-content-center align-items-center' style={{borderRadius: "0", fontSize: "12px"}} href="/login">
                            <p className='m-0 fw-bold'>{languageManager.get("Shared.LOG_IN")}</p>
                        </a>
                        :
                        <>
                        <div className="flex-shrink-0 dropdown">
                            <div className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://i.pinimg.com/originals/d7/38/9b/d7389ba6dadf70ff848a9804be09ac30.jpg" alt="mdo" width="32" height="32" className="rounded-circle" style={{width:"40px", height:"40px"}}/>
                            </div>
                            <ul className="dropdown-menu dropdown-menu-end text-small shadow" aria-labelledby="dropdownUser2">
                                <li>
                                    <select className='form-select'
                                            name="selectLanguage" id="selectLanguage"
                                            onChange={(v) => languageManager.changeAppLanguage(v.target.value as Languages)}>
                                        <option value="current" disabled hidden selected>{languageManager.get("Shared.CHANGE_LANGUAGE")}</option>
                                        <option value={Languages.ES}>{Languages.ES}</option>
                                        <option value={Languages.EN}>{Languages.EN}</option>
                                        <option value={Languages.CA}>{Languages.CA}</option>
                                    </select>
                                </li>
                                {isAdmin && <li><a className="dropdown-item" href="/adminPanel/manageUsers">{languageManager.get("Shared.ADMIN_PANEL")}</a></li>}
                                <li><button className="dropdown-item" onClick={logOut}>{languageManager.get("Shared.LOG_OUT")}</button></li>
                            </ul>
                        </div>
                        </>
                        }
                    </div>
                </div>
            </div>
        </nav>
        </header>

        <main ref={mainReference} className={`sharedInterface flex-${flexflow}`}>
            {props.children}
        </main>

        <footer className="sharedInterface px-2 bg-light py-2 d-flex justify-content-center align-items-center">
            <p className='text-muted'>Esto es un proyecto de fin de grado creado con fines educativos</p>
        </footer>
        </>
    );
}