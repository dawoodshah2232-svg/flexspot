import { useParams } from 'react-router-dom';
import SpotProfile from '../pages/SpotProfile';
import NotFound from '../pages/NotFound';

// Collision-safe root profiles: /:slug.
// Static routes always win over this dynamic route (React Router v6 ranking),
// so this only fires for genuinely unknown paths. Known spots render the
// profile; anything else gets the dedicated 404 — never the homepage.
export default function RootProfile(props) {
  const { slug } = useParams();
  const spot = (props.spots || []).find((s) => s.slug === slug);
  if (!spot) return <NotFound onClaim={props.onClaim} />;
  return <SpotProfile {...props} />;
}
