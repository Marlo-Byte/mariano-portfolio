import { client } from '@/sanity/client'
import { ProfileType, ProjectType, SkillType, SkillCategoryType, EducationType, mockProfile, mockProjects, mockSkills, mockSkillCategories, mockEducation } from '@/sanity/mockData'
import { Navbar } from '@/components/Navbar'
import { PageLoader } from '@/components/PageLoader'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Education } from '@/components/Education'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { AIChatBot } from '@/components/AIChatBot'

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
      categories: mockSkillCategories,
      education: mockEducation,
    }
  }

  try {
    const profileQuery = `*[_type == "profile"][0]`
    const projectsQuery = `*[_type == "project"] | order(orderRank asc, order asc)`
    const categoriesQuery = `*[_type == "skillCategory"] | order(orderRank asc, title asc)`
    const skillsQuery = `*[_type == "skill"] {
      ...,
      category->
    } | order(orderRank asc, order asc)`
    const educationQuery = `*[_type == "education"] | order(orderRank asc, startDate desc)`

    // Fetch profile, projects, categories, skills and education in parallel
    const [profile, projects, categories, skills, education] = await Promise.all([
      client.fetch<ProfileType | null>(profileQuery),
      client.fetch<ProjectType[]>(projectsQuery),
      client.fetch<SkillCategoryType[]>(categoriesQuery),
      client.fetch<SkillType[]>(skillsQuery),
      client.fetch<EducationType[]>(educationQuery),
    ])

    return {
      profile: profile || mockProfile,
      projects: projects && projects.length > 0 ? projects : mockProjects,
      categories: categories && categories.length > 0 ? categories : mockSkillCategories,
      skills: skills && skills.length > 0 ? skills : mockSkills,
      education: education && education.length > 0 ? education : mockEducation,
    }
  } catch (error) {
    console.error('Error fetching data from Sanity, using fallback mock data:', error)
    return {
      profile: mockProfile,
      projects: mockProjects,
      skills: mockSkills,
      categories: mockSkillCategories,
      education: mockEducation,
    }
  }
}

export default async function Home() {
  const { profile, projects, skills, categories, education } = await getData()

  return (
    <div className="flex flex-col min-h-screen">
      <PageLoader logoCharacter={profile.logoCharacter || profile.name.charAt(0)} />
      <Navbar profile={profile} />
      <main className="flex-grow">
        <Hero profile={profile} />
        <About profile={profile} />
        <Education education={education} />
        <Projects projects={projects} githubUrl={profile.githubUrl} />
        <Skills skills={skills} categories={categories} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
      {profile.aiEnabled !== false && <AIChatBot profile={profile} projects={projects} />}
    </div>
  )
}
