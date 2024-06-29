import { graph, config, auth} from '@grafbase/sdk'


const g = graph.Standalone()

// @ts-ignore
const user = g.type('User', {
  name: g.string().length({min:2,max:10}),
  email: g.email(),
  avatarUrl: g.url(),
  description: g.string().length({min:2,max:100}).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(), 
  projects: g.ref('Project').list().optional(),
// }).auth(rules => {
//   rules.public().read()
})

// @ts-ignore
const project = g.type('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string(), 
  image: g.url(),
  liveSiteUrl: g.url(), 
  githubUrl: g.url(), 
  category: g.string(),
  createdBy: g.ref(user),
// }).auth(rules => {
//   rules.public().read()
//   rules.private().create().delete().update()
})

const jwt = auth.JWT({
  name:'my-jwt',
  // 需要增加jwks字段
  jwks: {
    url:'http://127.0.0.1:3000',
    issuer: 'grafbase',
    secret:  g.env('NEXTAUTH_SECRET'),
    audience: 'my-project',
    pollInterval:'60s',
    // url:'https:://example.com/.well-known/jwks.json'
  },
  header: {
    name: 'Authorization',
    valuePrefix:'Bearer',
  },
})

export default config({
  schema: g,
  graph:graph.Federated(),
  auth: {
    providers: [jwt],
    // rules: (rules) => rules.private()
    rules: rules => rules.public()
  },
})

