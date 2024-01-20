import { BrowserRouter, Routes, Route } from "react-router-dom";
import Services from './pages/Services';
import NewUpdate from './pages/NewUpdate';

export default function ServicesRouter(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Services/>} />
        <Route path="/newupdate/:service_id" element={<NewUpdate/>} />
      </Routes>
    </BrowserRouter>
  );
}