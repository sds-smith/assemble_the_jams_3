import { Outlet } from "react-router-dom"

const Navigation = () => {

    return (
        <div>
            <div>Header</div>
            <Outlet />
        </div>
        // <div className="App">
        //   <header className="App-header">
        //     <div className='img-container'>
        //       <img src={currentUser ? profilePic : logo} className="App-logo" alt="logo" />
        //     </div>
        //     <h1>{currentUser ? displayName : 'Please Log In'}</h1>
        //     <a
        //       className="App-link" 
        //       href={SpotifyAuth} 
        //     > 
        //       Sign in with Spotify
        //     </a>
        //   </header>
        // </div>


    )
}

export default Navigation