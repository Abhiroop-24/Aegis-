## 2024-05-13 - Leaflet Marker Icon Thrashing & React.memo
**Learning:** In maps with hundreds of markers, recreating identical `L.divIcon` objects on every render creates massive memory overhead and triggers aggressive garbage collection pauses. Also, child components using map components re-render aggressively when parent sibling state changes unless memoized.
**Action:** Always cache Leaflet icon instances instead of creating them dynamically per marker, and wrap heavy mapping subcomponents (like MarkerClusterGroups) with `React.memo` to shield them from parent state changes.
