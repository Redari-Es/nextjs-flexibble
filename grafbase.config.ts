import { graph, config, auth } from '@grafbase/sdk'

const g = graph.Standalone()

const User = g.model('User', {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique,
  avatarUrl:g.url(),
  description: g.string().optional(),
  githubUrl:g.url().optional(),
  linkedInUrl:g.url().optional(),
  projects:g.relation(()=>Project).list().optional()
})

const Project = g.model('Project', {
  title: g.string().length({ min: 3 }),
  description:g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  createdBy:g.relation(()=>User),
})

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret:g.env('NEXTAUTH_SECRET')
})

export default config({
  graph: g,
  // auth: {
  //   providers:[jwt],
  //   rules: (rules) => {
  //     rules.private()
  //   },
  },
  // Caching - https://grafbase.com/docs/graphql-edge-caching
  // cache: {
  //   rules: [
  //     {
  //       types: ['Query'], // Cache everything for 60 seconds
  //       maxAge: 60,
  //       staleWhileRevalidate: 60
  //     }
  //   ]
  // }
})

