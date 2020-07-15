import React from 'react';
import IProfile from '../interfaces/IProfile';
import ProfileCard from '../components/ProfileCard';

interface IProfilesProps {
  profiles: IProfile[];
}

const renderProfiles = (profiles: IProfile[]) => {
  return profiles.map((profile) => <ProfileCard name={profile.name} id={profile.id} key={'card_' + profile.id} />);
};

const Profiles: React.FC<IProfilesProps> = (props) => {
  return <div>{renderProfiles(props.profiles)}</div>;
};

export default Profiles;
