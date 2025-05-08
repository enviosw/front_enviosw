export interface FormLoginInterface {
    onInputChange: (name: string, value: string) => void;

    handleLogin: () => void;
    
    toggleForm: () => void;
    
    form: {
        email: string;
        password: string;
    }
}

export interface FormRegisterInterface {
    onInputChange: (name: string, value: string) => void;

    handleRegister: () => void;

    toggleForm: () => void;

    form: {
        nombre: string;
        apellido: string;
        direccion: string;
        telefono: string;
        telefono2: string;
        email: string;
        password: string;
    };

}