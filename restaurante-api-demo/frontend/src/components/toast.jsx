import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (success, mensagem) => {

    if (success){
        toast.success(mensagem, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        });
    } else {
        toast.error(mensagem, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        });
    }
}

export const confirmToast = (mensagem) => {
    return new Promise((resolve) => {
        // ✅ Criar backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'toast-backdrop';
        document.body.appendChild(backdrop);
        
        const toastId = toast(
            <div style={{ padding: '10px' }}>
                <p style={{ marginBottom: '15px', fontSize: '16px' }}>
                    {mensagem}
                </p>
                <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    justifyContent: 'center' 
                }}>
                    <button
                        onClick={() => {
                            resolve(true);
                            toast.dismiss(toastId);
                            backdrop.remove(); // ✅ Remover backdrop
                        }}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}
                    >
                        ✅ Confirmar
                    </button>
                    <button
                        onClick={() => {
                            resolve(false);
                            toast.dismiss(toastId);
                            backdrop.remove(); // ✅ Remover backdrop
                        }}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}
                    >
                        ❌ Cancelar
                    </button>
                </div>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false,
                hideProgressBar: true,
                onClose: () => backdrop.remove() // ✅ Remover se fechar de outra forma
            }
        );
    });
};