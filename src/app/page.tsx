import { client } from '@/sanity/client'
import { ProfileType, ProjectType, SkillType, mockProfile, mockProjects, mockSkills } from '@/sanity/mockData'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

// Revalidate page data every 60 seconds (Incremental Static Regeneration)
export const revalidate = 60

async function getData() {
  const isSanityConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder'

  if (!isSanityConfigured) {
    return {
      profile: mockProfile,
      projects: mockProjects,
      skills: mockSkills,
    }
  }

  try {
    const profileQuery = `*[_type == "profile"][0]`
    const projectsQuery = `*[_type == "project"] | order(order asc)`
    const skillsQuery = `*[_type == "skill"] | order(order asc)`

    // Fetch profile, projects and skills in parallel
    const [profile, projects, skills] = await Promise.all([
      client.fetch<ProfileType | null>(profileQuery),
      client.fetch<ProjectType[]>(projectsQuery),
      client.fetch<SkillType[]>(skillsQuery),
    ])

    return {
      profile: profile || mockProfile,
      projects: projects && projects.length > 0 ? projects : mockProjects,
      skills: skills && skills.length > 0 ? skills : mockSkills,
    }
  } catch (error) {
    console.error('Error fetching data from Sanity, using fallback mock data:', error)
    return {
      profile: mockProfile,
      projects: mockProjects,
      skills: mockSkills,
    }
  }
}

export default async function Home() {
  const { profile, projects, skills } = await getData()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar profile={profile} />
      <main className="flex-grow">
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects projects={projects} githubUrl={profile.githubUrl} />
        <Skills skills={skills} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  )
}
