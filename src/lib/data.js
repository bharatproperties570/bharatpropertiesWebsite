// Request-scoped cache so generateMetadata() and the page share a single CRM call.
import { cache } from 'react';
import { fetchProjectBySlug, fetchListingBySlug } from '../services/crmService';

export const getProject = cache((slug) => fetchProjectBySlug(slug));
export const getListing = cache((slug) => fetchListingBySlug(slug));
