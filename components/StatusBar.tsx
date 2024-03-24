import React, {useContext} from 'react';
import { StatusBar as NativeStatusBar } from "native-base";
import { ThemeContext } from '../context/ThemeContext';


function StatusBar() {
    const {theme} = useContext(ThemeContext);
    return ( <NativeStatusBar backgroundColor={theme.screenBackgroud} /> );
}

export default StatusBar;