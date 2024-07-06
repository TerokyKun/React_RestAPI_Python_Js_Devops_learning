import { Routes, Route } from "react-router-dom";
import ArtGenerate from "./pages/ArtGenerate";
import MainPage from "./pages/MainPage";
import MainMenu from "./components/Elems/MainMenu";
import Test from "./pages/Test";
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Comunity from "./pages/Comunity";
import UserProfil from "./pages/UserProfil";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchLogin, selectIsAuth } from "./redux/slises/auth";

const App = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  
  React.useEffect(() => {
    dispatch(fetchLogin())
  }, [])
<<<<<<< HEAD
=======
  return (
    <>
      <Routes>
        <Route path="/" element = {<MainMenu/>}>
          <Route index element={<MainPage />} />
          <Route path="generate" element={<ArtGenerate />} />
          <Route path="test" element={<Test />} />
          <Route path="help" />
          <Route path="settings" />
          <Route path="community" element={<Comunity />}/>
          <Route path="user" element={<UserProfil />}/>
        </Route>
        <Route path="auth/login"  element={<Login />} />
        <Route path="/signup"  element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;


>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)

// // Получаем токен из куки
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// };

// // Проверяем наличие токена
// const accessToken = getCookie('access_token');

// if (accessToken) {
//   // Отправляем токен на сервер для аутентификации
//   fetch('http://localhost:4000/auth/me', {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     // Обработка ответа от сервера
//     if (data) {
//       // Пользователь авторизован, можно выполнить нужные действия
//       console.log('Пользователь авторизован:', data);
//     } else {
//       // Пользователь не авторизован или токен истек, выполнить соответствующие действия
//       console.log('Пользователь не авторизован');
//     }
//   })
//   .catch(error => {
//     console.error('Ошибка при запросе на сервер:', error);
//   });
// } else {
//   // Токен отсутствует, пользователь не авторизован
//   console.log('Токен отсутствует, пользователь не авторизован');
// }
<<<<<<< HEAD


  return (
    <>
      <Routes>
        <Route path="/" element = {<MainMenu/>}>
          <Route index element={<MainPage />} />
          <Route path="generate" element={<ArtGenerate />} />
          <Route path="test" element={<Test />} />
          <Route path="help" />
          <Route path="settings" />
          <Route path="community" element={<Comunity />}/>
          <Route path="user" element={<UserProfil />}/>
        </Route>
        <Route path="auth/login"  element={<Login />} />
        <Route path="/signup"  element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
=======
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
