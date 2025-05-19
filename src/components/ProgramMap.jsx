import { GoogleMap, LoadScript, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import { useState } from 'react';

const ProgramMap = ({filteredProgramLocations}) => {

     const [selectedProgram, setSelectedProgram] = useState(null);

    const containerStyle = {
        width: '100%',
        height: '500px'
    };

    const center = { lat: 41.081757, lng: -81.511452 };

    return (
        <>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} options={{
                zoomControl: true,       // ✅ Show zoom control
                //mapTypeControl: false,   // (optional) hide map type switcher
                //streetViewControl: false, // (optional) hide street view
                //fullscreenControl: false // (optional) hide fullscreen
            }}>
                {filteredProgramLocations.map((program, index) => (
                <Marker 
                    key={index} 
                    position={{ lat: parseFloat(program.latitude), lng: parseFloat(program.longitude) }} 
                    onClick={() => setSelectedProgram(program)}/>
                ))}
                {selectedProgram && (
                    <InfoWindow
                    position={{
                        lat: parseFloat(selectedProgram.latitude),
                        lng: parseFloat(selectedProgram.longitude),
                    }}
                    onCloseClick={() => setSelectedProgram(null)}
                    >
                    <div>
                        <strong>{selectedProgram.org_name} - {selectedProgram.program_name}</strong>
                    </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
        </>
    )
}



export default ProgramMap