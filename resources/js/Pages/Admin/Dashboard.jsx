// import Calendar from '@/Components/Calendar'
import { BookCopy, Calendar, Users, UsersRound } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import AuthLayout from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'

// =====================================
export default function Dashboard({ data, message }) {
  const { studentsCount, teachersCount, groupsCount, activeYear } = data || {}

  const statistics = [
    {
      title: 'Alunos',
      icon: <UsersRound />,
      value: studentsCount,
    },
    {
      title: 'Professores',
      icon: <Users />,
      value: teachersCount,
    },
    {
      title: 'Turmas',
      icon: <BookCopy />,
      value: groupsCount,
    },
    {
      title: 'Ano Letivo',
      icon: <Calendar />,
      value: activeYear,
    },
  ]

  return (
    <AuthLayout
      title={titles.dashboard}
      breadcrumb={breadcrumbs.dashboard}
      statistics={statistics}
    >
      {/* {message && <Alert>{message}</Alert>} */}
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
        blanditiis minima quia qui earum enim harum nostrum iste ipsum pariatur
        nihil voluptate eveniet sequi, recusandae optio nobis voluptatem vero
        voluptatum fugit delectus cupiditate sint fugiat! Reiciendis repellendus
        iste animi, nemo itaque similique illum. Similique corrupti animi ex
        praesentium eligendi harum? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sint voluptatibus officiis mollitia aperiam
        exercitationem perferendis, est natus impedit tempore nobis voluptate
        fugit quo, nostrum culpa inventore amet itaque harum fuga? Porro
        laboriosam, culpa id rem aperiam inventore blanditiis odio, fugit esse
        corporis rerum aspernatur nesciunt distinctio magnam provident enim
        eius. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Molestias blanditiis minima quia qui earum enim harum nostrum iste ipsum
        pariatur nihil voluptate eveniet sequi, recusandae optio nobis
        voluptatem vero voluptatum fugit delectus cupiditate sint fugiat!
        Reiciendis repellendus iste animi, nemo itaque similique illum.
        Similique corrupti animi ex praesentium eligendi harum? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Sint voluptatibus officiis
        mollitia aperiam exercitationem perferendis, est natus impedit tempore
        nobis voluptate fugit quo, nostrum culpa inventore amet itaque harum
        fuga? Porro laboriosam, culpa id rem aperiam inventore blanditiis odio,
        fugit esse corporis rerum aspernatur nesciunt distinctio magnam
        provident enim eius. Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Molestias blanditiis minima quia qui earum enim harum nostrum iste
        ipsum pariatur nihil voluptate eveniet sequi, recusandae optio nobis
        voluptatem vero voluptatum fugit delectus cupiditate sint fugiat!
        Reiciendis repellendus iste animi, nemo itaque similique illum.
        Similique corrupti animi ex praesentium eligendi harum? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Sint voluptatibus officiis
        mollitia aperiam exercitationem perferendis, est natus impedit tempore
        nobis voluptate fugit quo, nostrum culpa inventore amet itaque harum
        fuga? Porro laboriosam, culpa id rem aperiam inventore blanditiis odio,
        fugit esse corporis rerum aspernatur nesciunt distinctio magnam
        provident enim eius. Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Molestias blanditiis minima quia qui earum enim harum nostrum iste
        ipsum pariatur nihil voluptate eveniet sequi, recusandae optio nobis
        voluptatem vero voluptatum fugit delectus cupiditate sint fugiat!
        Reiciendis repellendus iste animi, nemo itaque similique illum.
        Similique corrupti animi ex praesentium eligendi harum? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Sint voluptatibus officiis
        mollitia aperiam exercitationem perferendis, est natus impedit tempore
        nobis voluptate fugit quo, nostrum culpa inventore amet itaque harum
        fuga? Porro laboriosam, culpa id rem aperiam inventore blanditiis odio,
        fugit esse corporis rerum aspernatur nesciunt distinctio magnam
        provident enim eius. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Et sapiente quas quisquam praesentium, ipsam dolor itaque,
        obcaecati fuga delectus dignissimos atque ducimus? Itaque unde, beatae
        excepturi incidunt culpa reiciendis eaque deleniti atque assumenda
        voluptas ab accusamus accusantium fuga est! Consequatur necessitatibus,
        ea architecto ab possimus qui nisi atque incidunt corporis, saepe
        maiores dignissimos iste tempore harum sit natus. Delectus, animi nobis
        officia consequuntur quos eaque qui exercitationem quam dignissimos
        laborum non ad nostrum illum. Beatae, ab dolore veritatis quis dolor,
        autem maxime aperiam corporis libero illo eveniet corrupti non totam
        officiis consequatur. Corrupti sequi repellendus vitae nobis magni quasi
        qui. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa,
        illum officia. Ea quidem dicta rem, deleniti sit inventore minus non!
        Earum eligendi inventore, dolorem, dolores laudantium in voluptatem
        fugit quibusdam consectetur nesciunt veniam officiis necessitatibus a
        placeat sunt quae perferendis illum quis, dolore itaque sapiente?
        Repudiandae ratione rem provident vitae corrupti, reiciendis tempore
        nostrum ex illo ad at. Delectus officiis quaerat beatae, corrupti
        maiores a quibusdam natus quos nulla quae veritatis dolor ratione soluta
        vel quo at possimus officia vitae expedita recusandae, doloremque
        architecto. Sequi enim odio, aliquid laudantium et quisquam nesciunt
        eius distinctio omnis nam ipsa minus nostrum iusto explicabo quos nihil
        deleniti id officia sunt exercitationem. Suscipit vitae itaque harum,
        error nisi perspiciatis exercitationem dignissimos aliquid, eos
        assumenda facere natus hic deleniti a tenetur distinctio et ab?
        Asperiores provident minima, omnis natus aperiam aliquid nihil delectus
        tempore alias nam. Magni dolorum repellendus sed enim quaerat
        doloremque, maiores voluptatum modi sapiente, porro delectus ipsum quasi
        quo minima nobis ipsa optio, saepe facilis placeat rerum! Incidunt quia
        ad corporis numquam odio provident, fugit dolor, accusantium deleniti
        est beatae exercitationem laudantium ipsa earum ea reiciendis!
        Architecto, impedit! Labore culpa praesentium, modi laudantium dolorum
        veniam placeat. Recusandae commodi eum in quae non libero! Quae
        temporibus quisquam blanditiis odio mollitia debitis, cumque laudantium
        officiis. Cumque molestias voluptates autem magni voluptatibus
        temporibus totam sapiente. Nulla excepturi aut, suscipit minima
        blanditiis pariatur autem quibusdam aspernatur rerum sapiente doloribus
        saepe cumque? Veniam nisi laborum magnam officiis illo praesentium
        obcaecati expedita esse nihil eveniet, laudantium et amet eos! Quas
        harum dolore mollitia nobis temporibus corporis, laudantium accusantium?
        Vel ab magnam beatae nisi? Quas, ipsam vero, in aliquam nisi voluptas
        voluptates quo delectus nobis inventore doloremque quia, incidunt
        impedit autem veritatis sunt recusandae facilis itaque officiis?
        Laudantium, recusandae. Accusantium eos voluptatem aut laborum non sequi
        ullam blanditiis quibusdam animi culpa ipsum fugiat, doloribus magni
        repellendus cum ipsa perferendis dolore et suscipit saepe. Doloremque
        repellendus fugit eaque distinctio provident! Sint adipisci ducimus
        reiciendis obcaecati recusandae, eligendi enim. Minus saepe iusto dicta
        cum facilis recusandae, nihil, impedit dolorum fugit mollitia in
        perspiciatis tenetur cupiditate cumque hic magni, beatae voluptate.
        Voluptatem repellat autem nam consequatur corporis reprehenderit commodi
        explicabo esse est cupiditate. Sequi, laboriosam repellat corporis
        perferendis, illo dicta illum nam, deleniti blanditiis exercitationem
        temporibus incidunt amet quas. Vitae accusamus at vel placeat fugit
        molestiae assumenda officiis adipisci sit, expedita eum pariatur est
        quasi neque culpa aliquid obcaecati corrupti error ut atque dolor
        dolorem! Esse qui voluptatibus sapiente alias ea voluptas accusamus nemo
        aut perferendis sequi at libero impedit ullam veritatis, neque dolorum
        rem consequuntur dolor dicta vel labore magni, corporis cumque. Delectus
        minus repellat iusto ipsam! Sapiente quisquam velit quidem, consequuntur
        libero soluta accusantium? Hic, natus vel, a accusamus, cum consectetur
        debitis culpa eligendi magnam quae quisquam suscipit fugiat laboriosam
        libero quas illum fuga quia alias consequuntur provident. Culpa
        mollitia, aspernatur similique quidem inventore distinctio dolor quasi
        molestias ab porro eius eveniet laudantium adipisci optio error illo
        minus maiores iure praesentium nesciunt! Laboriosam libero assumenda
        voluptate nihil rerum necessitatibus dicta repudiandae reiciendis nam
        aliquid natus corrupti, quis quidem excepturi provident inventore
        ducimus veritatis minus recusandae in obcaecati ut! Natus in, eligendi
        rerum sunt iste, alias harum voluptate libero, fugiat id sapiente
        aspernatur quisquam distinctio accusantium qui suscipit omnis ipsum quod
        commodi sequi maiores doloremque. Libero nemo veritatis adipisci porro
        excepturi, animi est eaque distinctio quas ratione. Omnis, itaque.
        Similique quaerat sequi laboriosam accusantium blanditiis esse excepturi
        perspiciatis soluta debitis tenetur cupiditate magni facere a illum
        ipsam quasi quidem fugiat consectetur earum corrupti dolorem nihil nisi,
        totam facilis? Adipisci facilis distinctio aspernatur aliquam nemo
        praesentium blanditiis temporibus natus aliquid maiores voluptatibus
        sequi, deleniti porro error in illo! Architecto suscipit repellat omnis
        natus cupiditate autem velit eligendi rem, hic facere obcaecati,
        reprehenderit eveniet. Commodi aperiam earum labore debitis impedit
        alias cupiditate a velit laudantium? Dolorum suscipit maxime incidunt
        porro cumque error amet, magni quasi quas quisquam fugit enim, vel
        possimus. Voluptas amet ducimus blanditiis ipsum doloribus laboriosam
        earum. Nam aliquid ipsam eius? Nam rem inventore ex, dolorum dolore
        pariatur molestiae distinctio saepe repellendus adipisci? Eos sit
        perferendis laudantium obcaecati praesentium, quam expedita. Autem ut
        dolor, sapiente odit perferendis rerum fuga modi necessitatibus eius
        quasi inventore officia debitis quibusdam, repellat, voluptates vel.
        Reprehenderit molestiae vel perspiciatis tempora a veritatis distinctio,
        quis laborum aut deleniti necessitatibus, similique provident
        consequatur! Ipsam, ut expedita! Temporibus illum natus molestiae sed
        fugiat iste laboriosam earum, quos dolores a delectus eos sint animi
        eaque, aliquid error esse ratione ab pariatur reprehenderit provident
        sit totam exercitationem. Asperiores repudiandae animi, culpa deleniti
        quia provident temporibus ipsa quas laboriosam consequuntur officiis
        quaerat reprehenderit possimus similique qui debitis laborum, placeat
        labore eum dolor quos sint, atque corrupti veritatis! Voluptatibus
        consequuntur perspiciatis similique, maxime consectetur, repellendus
        cupiditate dolores incidunt ad nam saepe voluptatem hic. Perspiciatis
        obcaecati iste veritatis fugiat quis, soluta voluptates, expedita sequi
        facere provident esse recusandae officia mollitia. Rerum sed quas
        quidem, cumque tempora delectus laborum enim reprehenderit dignissimos
        vitae. Perspiciatis vitae aspernatur nihil laborum quibusdam tempore,
        molestiae voluptatibus amet velit quod deleniti, rerum saepe quasi
        necessitatibus asperiores dolore debitis odit nesciunt veniam aut,
        numquam minima beatae! Delectus amet alias commodi molestias
        perspiciatis ratione recusandae sapiente aperiam ad placeat quis
        corrupti, ipsa ab reiciendis necessitatibus iure tempore asperiores, rem
        labore veritatis nesciunt ullam consectetur! Animi repudiandae aut
        voluptatibus blanditiis molestias rem explicabo dolorem ea, est culpa,
        perspiciatis quae voluptas odio accusamus maiores commodi ullam sit
        iusto! Est, assumenda doloribus beatae aliquam possimus voluptate nam
        cum incidunt fuga minima error porro soluta saepe accusamus voluptatibus
        dolor atque, libero debitis. Similique porro quasi tenetur neque?
        Facilis, ab sapiente. Hic officia ipsam vitae tenetur quod laboriosam
        facere nostrum, odit fugit minus nesciunt nemo debitis placeat. Fugit
        recusandae ducimus culpa reiciendis dignissimos. Consequuntur non eos
        voluptatem, quis rerum, adipisci corporis vero iusto odio fugit, optio
        esse autem. Animi eum et quaerat autem. Consequuntur quas exercitationem
        atque tenetur, blanditiis amet laborum animi magni, voluptate fuga natus
        ad hic totam assumenda rem nihil nam corrupti, porro voluptates
        necessitatibus beatae aliquam repellat. Id, ab. In delectus quasi minus
        corporis.
      </div>
    </AuthLayout>
  )
}
