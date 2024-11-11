import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary
import ImagesCarousel from '../components/ImagesCarosel'; // Adjust the import path as necessary
import BoxReveal from '../components/ui/BoxReavel';
import { SlightFlip } from '../components/ui/Fliptext';
import { ShineBorder } from '../components/ui/ShineBorder';
import { HeroVideoDialog } from '../components/ui/HeroVideo';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  return (
    <div className='bg-white dark:bg-gray-200'>
      <Navbar />
      
    </div>
  );
};

export default Dashboard;
