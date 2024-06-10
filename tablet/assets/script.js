class Map {
    constructor() {
        this.map
        this.longitude
        this.latitude
        this.redFlag
        this.blueFlag
        this.redFlagMarker
        this.blueFlagMarker

        // Fake locations for flag
        this.locations = [
            {
                longitude: 51.4418,
                latitude: 5.481
            },
            {
                longitude: 51.433,
                latitude: 5.488
            },
            {
                longitude: 51.44185,
                latitude: 5.4815
            },
            {
                longitude: 51.4335,
                latitude: 5.4885
            },
            {
                longitude: 51.4419,
                latitude: 5.482
            },
            {
                longitude: 51.434,
                latitude: 5.489
            },
            {
                longitude: 51.441925,
                latitude: 5.4821
            },
            {
                longitude: 51.43425,
                latitude: 5.4885
            },
            {
                longitude: 51.441930,
                latitude: 5.4824
            },
            {
                longitude: 51.43445,
                latitude: 5.4880
            }
        ]
    }

    init() {
        this.createMap()

        this.fetchFlagLocations()
        this.displayFlagLocations()

        setInterval( () => {
            this.fakeLocationUpdate()
        }, 1000 )

        setInterval( () => {
            this.calculateGameCentre()
        }, 2000 )
    }
    
    createMap() {
        this.map = L.map( 'map' ).setView( [51.4393, 5.4816], 15 )

        L.tileLayer( 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo( this.map )
    }

    fetchFlagLocations() {
        this.redFlag = {
            longitude: 51.4418,
            latitude: 5.481
        }
        this.blueFlag = {
            longitude: 51.433,
            latitude: 5.488
        }
    }
    displayFlagLocations() {
        const divIcon = L.divIcon({
            html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>',
            className: 'flag-location',
            iconSize: [50, 50],
            iconAnchor: [25, 25]
        })

        if ( this.redFlagMarker ) {
            this.redFlagMarker.setLatLng( [this.redFlag.longitude, this.redFlag.latitude] )
        } else {
            this.redFlagMarker = L.marker( [this.redFlag.longitude, this.redFlag.latitude], { icon: divIcon } ).addTo( this.map ).bindPopup('Red flag')
            this.redFlagMarker._icon.classList.add( 'red-flag' )
        }

        if ( this.blueFlagMarker ) {
            this.blueFlagMarker.setLatLng( [this.blueFlag.longitude, this.blueFlag.latitude] )
        } else {
            this.blueFlagMarker = L.marker( [this.blueFlag.longitude, this.blueFlag.latitude], { icon: divIcon} ).addTo( this.map ).bindPopup('Blue flag')
            this.blueFlagMarker._icon.classList.add( 'blue-flag' )
        }
    }

    calculateGameCentre() {
        let long = ( this.redFlag.longitude + this.blueFlag.longitude ) / 2 
        let lat = ( this.redFlag.latitude + this.blueFlag.latitude ) / 2

        this.map.setView( [long, lat], 15 )
    }

    fakeLocationUpdate() {
        let loc1 = this.locations.shift()
        this.locations.push( loc1 )
        this.redFlag = loc1

        let loc2 = this.locations.shift()
        this.locations.push( loc2 )
        this.blueFlag = loc2

        this.displayFlagLocations()
    }
}

document.addEventListener( 'DOMContentLoaded', () => {
    const map = new Map()
    map.init()
})