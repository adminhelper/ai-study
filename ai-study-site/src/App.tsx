import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import Glossary from './pages/Glossary';
import Community from './pages/Community';
import News from './pages/News';
import Showcase from './pages/Showcase';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="glossary" element={<Glossary />} />
        <Route path="community" element={<Community />} />
        <Route path="news" element={<News />} />
        <Route path="showcase" element={<Showcase />} />
      </Route>
    </Routes>
  );
}
