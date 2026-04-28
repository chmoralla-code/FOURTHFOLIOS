import { notFound } from 'next/navigation'
import { getProject } from '@/lib/db'

export default async function ProjectPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const project = await getProject(params.id)

    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-light mb-4">{project.title}</h1>
          <div className="flex gap-8 mb-12 text-gray-600">
            <div>
              <p className="text-sm uppercase tracking-wider">Location</p>
              <p className="text-lg">{project.location}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider">Year</p>
              <p className="text-lg">{project.year}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider">Category</p>
              <p className="text-lg">{project.category}</p>
            </div>
          </div>

          <p className="text-lg leading-relaxed mb-16 max-w-2xl">
            {project.description}
          </p>

          {project.images && project.images.length > 0 ? (
            <div className="grid gap-8">
              {project.images.map((img: any) => (
                <div key={img.id} className="aspect-video bg-gray-100">
                  <img
                    src={img.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500">No images</span>
            </div>
          )}
        </div>
      </main>
    )
  } catch (error) {
    notFound()
  }
}
