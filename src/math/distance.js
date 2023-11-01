export function haversineDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusMiles = 3959;
    const earthRadiusFeet = 3959 * 5280; // 1 mile = 5280 feet

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));

    const distanceMiles = earthRadiusMiles * c;
    const distanceFeet = distanceMiles * earthRadiusFeet;

    return { miles: distanceMiles, feet: distanceFeet };
}