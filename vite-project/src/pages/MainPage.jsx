
import MainMenu from "../components/Elems/MainMenu"
import PostsZone from "../components/Elems/PostZone/PostsZone"
import ArtZone from "../components/Elems/ArtZone/ArtZone"
import Burgermenu from "../components/UI/Burgermenu/Burgermenu";


const MainPage = () => {
 

  return (
    <>
<div className=''>
<Burgermenu></Burgermenu>    
<MainMenu></MainMenu>
<PostsZone></PostsZone>
<ArtZone></ArtZone>
</div>


    </>
  )
}

export default MainPage
