import React from "react";
import ChatRoom from "./component/ChatRoom";
import styled from "styled-components";
import AppColors from "./theme/styles/AppColors";

const Theme = styled.div`
  background-image: ${ AppColors.MAIN_BLUE };
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const App = () => {
    return (
    <Theme >
        <ChatRoom />
    </Theme>
  )
}

export default App
