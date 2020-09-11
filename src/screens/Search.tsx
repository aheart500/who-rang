import React from 'react';
import GradientView from '../components/GradientView';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';
import {DrawerProps} from './ScreensProps';

const Search = ({navigation}: DrawerProps<'search'>) => {
  const openDrawer = () => navigation.openDrawer();
  return (
    <GradientView>
      <StatusBar />
      <Header openDrawer={openDrawer} />
    </GradientView>
  );
};

export default Search;
