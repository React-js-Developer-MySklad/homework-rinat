import './style.css'
import {createRoot} from "react-dom/client";

const rootElement = document.getElementById('root');

const root = createRoot(rootElement)
root.render(
    <div className='layout'>
        I was migrated to React!
    </div>
);
