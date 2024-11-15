<script setup>
import {ref} from "vue";
import TableComponent from "@/components/Table.vue";
import ElButton from '@/components/Button.vue'
import ProjectCard from "@/components/ProjectCard.vue";

// Defining columns and table data
const columns = ref([
  {label: "Name", field: "name"},
  {label: "Age", field: "age"},
  {label: "City", field: "city"}
]);

const tableData = ref([
  {name: "Alice", age: 25, city: "New York"},
  {name: "Bob", age: 30, city: "San Francisco"},
  {name: "Charlie", age: 35, city: "Los Angeles"},
  {name: "David", age: 40, city: "Chicago"},
  {name: "Eve", age: 28, city: "Miami"},
  {name: "Frank", age: 50, city: "Dallas"},
  {name: "Grace", age: 29, city: "Seattle"}
]);

// Dark mode toggle
const isDarkMode = ref(false);

const projectLists = [
            {
                "id": "f866c839-c191-066a-5726-f7ac2dcfefde",
                "name": "BankKredit",
                "description": "Маркетплейс кредитов от всех банков Узбекистана",
                "logo": "8a8180f0af08859a73bd89bb",
                "owner_id": "c750b8f1-014f-2c64-c940-2a6bb4f1af66",
                "t_id": "f866c839-c191-066a-5726-f7ac2dcfefde",
                "start_date": 1672513200000,
                "end_date": null,
                "tasks_count": 1528,
                "active_tasks": 17,
                "done_tasks": 1460,
                "backlog_tasks": 4,
                "executors": "Ҳасанов Авазбек Олимович, Тошмуродов Нодирбек Тўрақул ўғли, Абдувохидов Абдумалик Абдусалом ўғли, Ташев Абдулазиз Хуршиддинович, Файзуллаев Ҳасан Акбар ўғли, Мирзахакимов Акмалбек Сойибжонович, Холказаков Азизжон Абдикарим ўғли, Қаюмжонов Муҳаммаджон Максуд ўғли, Жовлиев Иномжон Эркин ўғли",
                "owner_name": "Саидов Бекзод",
                "task_count": "17 / 1528",
                "sugg_count": 0,
                "member_images": {
                    "type": "json",
                    "value": "[\"/srv/project/backend/media/platon/images/sm/person/images/ff808181690bddcf7a35319c.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff808181a8f7dc757a4a83fc.jpg\",\"sm/person/images/ff808181ffd2da157a3f9282.jpg\",\"sm/person/images/ff8081810a0ed1017a3958e6.jpg\",\"sm/person/images/ff808181af67def07a48c4d8.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff808181653ad2fe7a36e7b1.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff8081819a4ad9f67a461212.jpg\",\"sm/person/images/ff80818109e9cffa7a417464.jpg\",\"sm/person/images/ff808181bd575bb52d61cc79.png\"]"
                },
                "member_names": {
                    "type": "json",
                    "value": "[\"Ҳасанов Авазбек Олимович\",\"Тошмуродов Нодирбек Тўрақул ўғли\",\"Абдувохидов Абдумалик Абдусалом ўғли\",\"Ташев Абдулазиз Хуршиддинович\",\"Файзуллаев Ҳасан Акбар ўғли\",\"Мирзахакимов Акмалбек Сойибжонович\",\"Холказаков Азизжон Абдикарим ўғли\",\"Қаюмжонов Муҳаммаджон Максуд ўғли\",\"Жовлиев Иномжон Эркин ўғли\"]"
                },
                "img": "8a8180f00138aef5b03f597c",
                "positions": {
                    "type": "json",
                    "value": "[\"кичик дастурчи\",\"кичик дастурчи\",\"веб-дизайнер\",\"кичик дастурчи\",\"дастурчи\",\"лойиҳалар менежери\",\"бўлим бошлиғи\",\"кичик дастурчи\",\"кичик дастурчи\"]"
                },
                "owner_position": "техник директори",
                "is_favourite": false,
                "uz_members": "HASANOV AVAZBEK OLIMOVICH, TOSHMURODOV NODIRBEK TO‘RAQUL O‘G‘LI, ABDUVOXIDOV ABDUMALIK ABDUSALOM O‘G‘LI, TASHEV ABDULAZIZ XURSHIDDINOVICH, FAYZULLAYEV HASAN AKBAR O‘G‘LI, MIRZAXAKIMOV AKMALBEK SOYIBJONOVICH, XOLKAZAKOV AZIZJON ABDIKARIM O‘G‘LI, QAYUMJONOV MUHAMMADJON MAKSUD O‘G‘LI, JOVLIYEV INOMJON ERKIN O‘G‘LI",
                "owner_name1": "SAIDOV BEKZOD",
                "is_project_admin": false,
                "staff_id": "01d4b6bb-8a2c-4f42-8bbe-e0b3e969ee07",
                "member_ids": "{'1e67df42-e366-4a9e-86b6-a6e6cfabf8b4','f2d04baa-50cc-4bae-88c7-1252278bb30d','dcd9f4e2-d165-4302-a20e-4f5a58acd980','5d55145e-9587-4075-82f0-21042fcda1ed','44758b25-3b9c-4b56-8b22-241775980eee','0dd2873a-7c3e-4368-8d36-92075eec6da3','4ca88e6b-da80-4717-9be5-cff3adbd00da','b4bf363d-f086-15e7-a35c-68fb17d01e09','01d4b6bb-8a2c-4f42-8bbe-e0b3e969ee07'}",
                "status": "ACTIVE"
            },
            {
                "id": "0a4f0d47-c519-96c1-d655-e95b5c56d22c",
                "name": "Технические задачи Expert.UZ",
                "description": "Масофавий таълим хизматлари",
                "logo": "8a8180f08e26af5a51a166ab",
                "owner_id": "9e898d8a-96de-4da1-937c-04de985ec8b1",
                "t_id": "0a4f0d47-c519-96c1-d655-e95b5c56d22c",
                "start_date": 1682881200000,
                "end_date": 1693508400000,
                "tasks_count": 546,
                "active_tasks": 3,
                "done_tasks": 504,
                "backlog_tasks": 32,
                "executors": "Ҳасанов Авазбек Олимович, Ўткиров Акбаржон Вохид ўғли, Абдувохидов Абдумалик Абдусалом ўғли, Мавлонов Жура Худоёрович, Бозоров Мухаммад Журакулович, Мўминов Ҳайдар Муҳиддинович, Умаров Муҳаммадсолиҳ Аҳмаджон ўғли, Ҳабибжонов Жавоҳир Мирзоҳид-ўғли, Мирахматов Мирмухсин Мирмахмудович, Салихов Ровшан Дилмурод ўғли, Расулов Авазбек Фахриддин  ўғли, Рахимов Абдуллоҳ Жамшид ўғли, Ҳабибуллоев Толибжон Ҳамид ўғли, Нормуродов Хуршид Камол ўғли, Каримов Хуршид Дилшод ўғли",
                "owner_name": "Хасанбоев Умаржон",
                "task_count": "3 / 546",
                "sugg_count": 0,
                "member_images": {
                    "type": "json",
                    "value": "[\"/srv/project/backend/media/platon/images/sm/person/images/ff808181690bddcf7a35319c.jpg\",\"sm/person/images/ff8081812c09d79e7a3f7d6a.jpg\",\"sm/person/images/ff808181ffd2da157a3f9282.jpg\",\"sm/person/images/ff80818151a83a4124a7d6e4.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/8a8180f0fefeae5259b5b1fa.jpg\",\"sm/person/images/ff8081810e0cd5e47a486788.jpg\",null,\"/srv/project/backend/media/platon/images/sm/person/images/ff8081812c4bd95c7a3f46c7.jpg\",\"sm/person/images/ff808181697d38f949283565.jpg\",\"sm/person/images/ff8081812fa56f8073050dbf.jpg\",\"sm/person/images/ff808181beacd3207a463088.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff808181aa01da8c7a3f45de.jpg\",\"sm/person/images/ff808181477608b8718bcb5b.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff8081817e91cfe37a3ca1f2.jpg\",\"sm/person/images/ff8081818b0ad2f17a3af984.jpg\"]"
                },
                "member_names": {
                    "type": "json",
                    "value": "[\"Ҳасанов Авазбек Олимович\",\"Ўткиров Акбаржон Вохид ўғли\",\"Абдувохидов Абдумалик Абдусалом ўғли\",\"Мавлонов Жура Худоёрович\",\"Бозоров Мухаммад Журакулович\",\"Мўминов Ҳайдар Муҳиддинович\",\"Умаров Муҳаммадсолиҳ Аҳмаджон ўғли\",\"Ҳабибжонов Жавоҳир Мирзоҳид-ўғли\",\"Мирахматов Мирмухсин Мирмахмудович\",\"Салихов Ровшан Дилмурод ўғли\",\"Расулов Авазбек Фахриддин  ўғли\",\"Рахимов Абдуллоҳ Жамшид ўғли\",\"Ҳабибуллоев Толибжон Ҳамид ўғли\",\"Нормуродов Хуршид Камол ўғли\",\"Каримов Хуршид Дилшод ўғли\"]"
                },
                "img": "8a8180f0918f35e595c082ef",
                "positions": {
                    "type": "json",
                    "value": "[\"кичик дастурчи\",\"кичик дастурчи\",\"веб-дизайнер\",\"Бош директор маслаҳатчиси\",\"бўлим бошлиғи\",\"таълим технологиялари ва стартап лойиҳалар бўйича директор\",\"бўлим бошлиғи\",\"кичик дастурчиси\",\"дастурчиси\",\"кичик дастурчи\",\"кичик дастурчи\",\"дастурчи\",\"кичик дастурчи\",\"бўлим бошлиғи\",\"кичик дастурчи\"]"
                },
                "owner_position": null,
                "is_favourite": false,
                "uz_members": "HASANOV AVAZBEK OLIMOVICH, O‘TKIROV AKBARJON VOXID O‘G‘LI, ABDUVOXIDOV ABDUMALIK ABDUSALOM O‘G‘LI, MAVLONOV JURA XUDOYOROVICH, BOZOROV MUXAMMAD JURAKULOVICH, MO‘MINOV HAYDAR MUHIDDINOVICH, UMAROV MUHAMMADSOLIH AHMADJON O‘G‘LI, HABIBJONOV JAVOHIR MIRZOHID-O‘G‘LI, MIRAXMATOV MIRMUXSIN MIRMAXMUDOVICH, SALIXOV ROVSHAN DILMUROD O‘G‘LI, RASULOV AVAZBEK FAXRIDDIN  O‘G‘LI, RAXIMOV ABDULLOH JAMSHID O‘G‘LI, HABIBULLOYEV TOLIBJON HAMID O‘G‘LI, NORMURODOV XURSHID KAMOL O‘G‘LI, KARIMOV XURSHID DILSHOD O‘G‘LI",
                "owner_name1": "XASANBOYEV UMARJON",
                "is_project_admin": false,
                "staff_id": "01d4b6bb-8a2c-4f42-8bbe-e0b3e969ee07",
                "member_ids": "{'1e67df42-e366-4a9e-86b6-a6e6cfabf8b4','3369ba05-dc54-f4bf-4da3-1236ce25a80e','d6affed5-3971-45d4-83c1-8d6c2efe96ea','265c44a4-c300-f10a-3458-83abc8301c79','5807f11f-42a4-403e-8e49-f320d01117b0','43cc5bb0-44b3-4bb7-a8b9-d47b1ccf32b6','b55b4ec0-11ec-6708-990d-bf7900f4ed14','831a93fa-8ade-40d2-ab79-2a0985d76328','8f38c19a-0fbb-42b1-ac2d-675d7cd7cf73','76d13dad-5b56-4949-9b9b-393ca5e8bbe5','45a13f56-752d-47f8-a3a0-a207ebdd392d','1cdc03b2-51c1-46df-bb6b-c821f0f0b5a7','4b0f1ee1-b773-4cc2-86b9-dc82ece52780','a634640e-c549-4df0-afab-bcd28f2f8866','01d4b6bb-8a2c-4f42-8bbe-e0b3e969ee07'}",
                "status": "ACTIVE"
            },
            {
                "id": "ce11a0b8-0410-70d8-136b-6b23d3825de1",
                "name": "Техник топшириқлар",
                "description": "Лойиҳалар учун техник топшириқларни ишлаб чиқиш.",
                "logo": null,
                "owner_id": "265c44a4-c300-f10a-3458-83abc8301c79",
                "t_id": "ce11a0b8-0410-70d8-136b-6b23d3825de1",
                "start_date": 1672599600000,
                "end_date": 1703962800000,
                "tasks_count": 138,
                "active_tasks": 1,
                "done_tasks": 135,
                "backlog_tasks": 0,
                "executors": "Ҳасанов Авазбек Олимович, Ташев Абдулазиз Хуршиддинович, Жалолов Ботирали Рустамович, Файзуллаев Ҳасан Акбар ўғли, Парманов Лазизбек Юсупович, Ҳабибуллоев Толибжон Ҳамид ўғли, Хаммедов Рухид Адил ўғли, Нуруллаев Зафар Фарход ўғли",
                "owner_name": "Мавлонов Жура",
                "task_count": "1 / 138",
                "sugg_count": 0,
                "member_images": {
                    "type": "json",
                    "value": "[\"/srv/project/backend/media/platon/images/sm/person/images/ff808181690bddcf7a35319c.jpg\",\"sm/person/images/ff8081810a0ed1017a3958e6.jpg\",\"sm/person/images/ff8081812fee091068a92277.jpeg\",\"sm/person/images/ff808181af67def07a48c4d8.jpg\",\"sm/person/images/ff8081813da0dc377a3da0db.jpg\",\"sm/person/images/ff808181477608b8718bcb5b.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff808181fad8d5337a38f244.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff8081812e2adcee7a401f21.jpg\"]"
                },
                "member_names": {
                    "type": "json",
                    "value": "[\"Ҳасанов Авазбек Олимович\",\"Ташев Абдулазиз Хуршиддинович\",\"Жалолов Ботирали Рустамович\",\"Файзуллаев Ҳасан Акбар ўғли\",\"Парманов Лазизбек Юсупович\",\"Ҳабибуллоев Толибжон Ҳамид ўғли\",\"Хаммедов Рухид Адил ўғли\",\"Нуруллаев Зафар Фарход ўғли\"]"
                },
                "img": "ff80818151a83a4124a7d6e4",
                "positions": {
                    "type": "json",
                    "value": "[\"кичик дастурчи\",\"кичик дастурчи\",null,\"дастурчи\",\"тижорат директори\",\"кичик дастурчи\",\"бўлим бошлиғи\",\"лойиҳалар менежери\"]"
                },
                "owner_position": "Бош директор маслаҳатчиси",
                "is_favourite": false,
                "uz_members": "HASANOV AVAZBEK OLIMOVICH, TASHEV ABDULAZIZ XURSHIDDINOVICH, JALOLOV BOTIRALI RUSTAMOVICH, FAYZULLAYEV HASAN AKBAR O‘G‘LI, PARMANOV LAZIZBEK YUSUPOVICH, HABIBULLOYEV TOLIBJON HAMID O‘G‘LI, XAMMEDOV RUXID ADIL O‘G‘LI, NURULLAYEV ZAFAR FARXOD O‘G‘LI",
                "owner_name1": "MAVLONOV JURA",
                "is_project_admin": false,
                "staff_id": "01d4b6bb-8a2c-4f42-8bbe-e0b3e969ee07",
                "member_ids": "{'49ac1ed0-d87e-4b9b-8f5a-43a83823e372','bf276034-f98f-4c54-a070-fbfb3333cfcb','9eef797a-0f99-45a9-81bb-f919fdc83089','44758b25-3b9c-4b56-8b22-241775980eee','4ca88e6b-da80-4717-9be5-cff3adbd00da','bd4d8342-d659-fc3e-392b-8efa8bf902af','a634640e-c549-4df0-afab-bcd28f2f8866','01d4b6bb-8a2c-4f42-8bbe-e0b3e969ee07'}",
                "status": "ACTIVE"
            },
            {
                "id": "36cca064-62bc-f9fd-459d-77edfb10daf1",
                "name": "SuvKredit",
                "description": null,
                "logo": "ff8081816814ff80c170fbd8",
                "owner_id": "c750b8f1-014f-2c64-c940-2a6bb4f1af66",
                "t_id": "36cca064-62bc-f9fd-459d-77edfb10daf1",
                "start_date": 1696100400000,
                "end_date": null,
                "tasks_count": 769,
                "active_tasks": 4,
                "done_tasks": 741,
                "backlog_tasks": 0,
                "executors": "Ҳасанов Авазбек Олимович, Тошмуродов Нодирбек Тўрақул ўғли, Ўсаров Бекзод Равшан ўғли, Ташев Абдулазиз Хуршиддинович, Умаров Муҳаммадсолиҳ Аҳмаджон ўғли, Файзуллаев Ҳасан Акбар ўғли, Ўрмонов Муҳаммадюсуф Абдусамат ўғли, Мирзахакимов Акмалбек Сойибжонович, Козимов Жавохирбек Комолдин ўғли, Холказаков Азизжон Абдикарим ўғли, Қаюмжонов Муҳаммаджон Максуд ўғли, Жовлиев Иномжон Эркин ўғли",
                "owner_name": "Саидов Бекзод",
                "task_count": "4 / 769",
                "sugg_count": 0,
                "member_images": {
                    "type": "json",
                    "value": "[\"/srv/project/backend/media/platon/images/sm/person/images/ff808181690bddcf7a35319c.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff808181a8f7dc757a4a83fc.jpg\",\"sm/person/images/ff808181e756dd567a569744.jpg\",\"sm/person/images/ff8081810a0ed1017a3958e6.jpg\",null,\"sm/person/images/ff808181af67def07a48c4d8.jpg\",\"sm/person/images/ff8081814c30f2dc4df43e8b.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff808181653ad2fe7a36e7b1.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff80818124bfd88c7a3697a5.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff8081819a4ad9f67a461212.jpg\",\"sm/person/images/ff80818109e9cffa7a417464.jpg\",\"sm/person/images/ff808181bd575bb52d61cc79.png\"]"
                },
                "member_names": {
                    "type": "json",
                    "value": "[\"Ҳасанов Авазбек Олимович\",\"Тошмуродов Нодирбек Тўрақул ўғли\",\"Ўсаров Бекзод Равшан ўғли\",\"Ташев Абдулазиз Хуршиддинович\",\"Умаров Муҳаммадсолиҳ Аҳмаджон ўғли\",\"Файзуллаев Ҳасан Акбар ўғли\",\"Ўрмонов Муҳаммадюсуф Абдусамат ўғли\",\"Мирзахакимов Акмалбек Сойибжонович\",\"Козимов Жавохирбек Комолдин ўғли\",\"Холказаков Азизжон Абдикарим ўғли\",\"Қаюмжонов Муҳаммаджон Максуд ўғли\",\"Жовлиев Иномжон Эркин ўғли\"]"
                },
                "img": "8a8180f00138aef5b03f597c",
                "positions": {
                    "type": "json",
                    "value": "[\"кичик дастурчи\",\"кичик дастурчи\",\"дастурчи\",\"кичик дастурчи\",\"бўлим бошлиғи\",\"дастурчи\",\"кичик дастурчиси\",\"лойиҳалар менежери\",\"дастурчи\",\"бўлим бошлиғи\",\"кичик дастурчи\",\"кичик дастурчи\"]"
                },
                "owner_position": "техник директори",
                "is_favourite": false,
                "uz_members": "HASANOV AVAZBEK OLIMOVICH, TOSHMURODOV NODIRBEK TO‘RAQUL O‘G‘LI, O‘SAROV BEKZOD RAVSHAN O‘G‘LI, TASHEV ABDULAZIZ XURSHIDDINOVICH, UMAROV MUHAMMADSOLIH AHMADJON O‘G‘LI, FAYZULLAYEV HASAN AKBAR O‘G‘LI, O‘RMONOV MUHAMMADYUSUF ABDUSAMAT O‘G‘LI, MIRZAXAKIMOV AKMALBEK SOYIBJONOVICH, KOZIMOV JAVOXIRBEK KOMOLDIN O‘G‘LI, XOLKAZAKOV AZIZJON ABDIKARIM O‘G‘LI, QAYUMJONOV MUHAMMADJON MAKSUD O‘G‘LI, JOVLIYEV INOMJON ERKIN O‘G‘LI",
                "owner_name1": "SAIDOV BEKZOD",
                "is_project_admin": false,
                "staff_id": "01d4b6bb-8a2c-4f42-8bbe-e0b3e969ee07",
                "member_ids": "{'f2d04baa-50cc-4bae-88c7-1252278bb30d','9ba331b9-f249-4151-4a30-ee79c805a7a1','dcd9f4e2-d165-4302-a20e-4f5a58acd980','5d55145e-9587-4075-82f0-21042fcda1ed','44758b25-3b9c-4b56-8b22-241775980eee','0dd2873a-7c3e-4368-8d36-92075eec6da3','4e8b3eed-7421-4059-982f-f018124a9343','1c9d840e-2f48-492b-beb1-39d9fc5fe6b4','4ca88e6b-da80-4717-9be5-cff3adbd00da','b4bf363d-f086-15e7-a35c-68fb17d01e09','01d4b6bb-8a2c-4f42-8bbe-e0b3e969ee07','45a13f56-752d-47f8-a3a0-a207ebdd392d'}",
                "status": "ACTIVE"
            },
            {
                "id": "84d07672-e614-3b9b-e6b9-be18300d2495",
                "name": "Biznes portal ",
                "description": "Biznes rivojlantirish banki uchun platforma",
                "logo": "ff808181af620cb6ebbce095",
                "owner_id": "bf276034-f98f-4c54-a070-fbfb3333cfcb",
                "t_id": "84d07672-e614-3b9b-e6b9-be18300d2495",
                "start_date": 1700420400000,
                "end_date": 1706641200000,
                "tasks_count": 3150,
                "active_tasks": 38,
                "done_tasks": 3016,
                "backlog_tasks": 0,
                "executors": "Ҳасанов Авазбек Олимович, Ўралов Зафаржон Жаҳонгир ўғли, Тошмуродов Нодирбек Тўрақул ўғли, Абдувохидов Абдумалик Абдусалом ўғли, Ўсканов Жахонгир Ойбек ўғли, Мўминов Ҳайдар Муҳиддинович, Ташев Абдулазиз Хуршиддинович, Умаров Муҳаммадсолиҳ Аҳмаджон ўғли, Файзуллаев Ҳасан Акбар ўғли, Ўрмонов Муҳаммадюсуф Абдусамат ўғли, Каландаров Азизбек Анварбекович, Насруллоев Ҳаётжон Хабибуллоевич, Мирзахакимов Акмалбек Сойибжонович, Усенов Бобур Марат ўғли, Исломов Абу-Бакир Ғайрат ўғли, Рахимжонов Жамшидбек Ботиржон ўғли, Рахимов Абдуллоҳ Жамшид ўғли, Парманов Лазизбек Юсупович, Ахмаджонов Илхомжон Усмонжонович, Искандаров Асрор Хабибуллаевич, Холказаков Азизжон Абдикарим ўғли, Нормуродов Хуршид Камол ўғли, Саидов Бекзод Ахмадович, Исломов Камронбек Мирза ўғли, Қаюмжонов Муҳаммаджон Максуд ўғли, Тўхтамуродов Бобур Бозорович, Жовлиев Иномжон Эркин ўғли, Тошмаматов Муҳаммадумид Олимжонович",
                "owner_name": "Нуруллаев Зафар",
                "task_count": "38 / 3150",
                "sugg_count": 0,
                "member_images": {
                    "type": "json",
                    "value": "[\"/srv/project/backend/media/platon/images/sm/person/images/ff808181690bddcf7a35319c.jpg\",null,\"/srv/project/backend/media/platon/images/sm/person/images/ff808181a8f7dc757a4a83fc.jpg\",\"sm/person/images/ff808181ffd2da157a3f9282.jpg\",\"sm/person/images/ff8081814a2dd4957a4a5b20.jpg\",\"sm/person/images/ff8081810e0cd5e47a486788.jpg\",\"sm/person/images/ff8081810a0ed1017a3958e6.jpg\",null,\"sm/person/images/ff808181af67def07a48c4d8.jpg\",\"sm/person/images/ff8081814c30f2dc4df43e8b.jpg\",\"sm/person/images/ff8081816e76de1c7a380332.jpg\",\"sm/person/images/ff8081810085d1177a38e4ce.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff808181653ad2fe7a36e7b1.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff808181899cd0517a3a730e.jpg\",\"sm/person/images/ff80818175fddb317a48d0b1.jpg\",\"sm/person/images/ff808181c731d0c87a4695e2.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff808181aa01da8c7a3f45de.jpg\",\"sm/person/images/ff8081813da0dc377a3da0db.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff808181d884d36d7a3e8935.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/8a8180f00d7063751ba4f995.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff8081819a4ad9f67a461212.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff8081817e91cfe37a3ca1f2.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff8081810538d21b7a458363.jpg\",\"/srv/project/backend/media/platon/images/sm/person/images/ff808181b4e9d2287a38257f.jpg\",\"sm/person/images/ff80818109e9cffa7a417464.jpg\",\"sm/person/images/ff808181a5e8d9a97a4207d9.jpg\",\"sm/person/images/ff808181bd575bb52d61cc79.png\",null]"
                },
                "member_names": {
                    "type": "json",
                    "value": "[\"Ҳасанов Авазбек Олимович\",\"Ўралов Зафаржон Жаҳонгир ўғли\",\"Тошмуродов Нодирбек Тўрақул ўғли\",\"Абдувохидов Абдумалик Абдусалом ўғли\",\"Ўсканов Жахонгир Ойбек ўғли\",\"Мўминов Ҳайдар Муҳиддинович\",\"Ташев Абдулазиз Хуршиддинович\",\"Умаров Муҳаммадсолиҳ Аҳмаджон ўғли\",\"Файзуллаев Ҳасан Акбар ўғли\",\"Ўрмонов Муҳаммадюсуф Абдусамат ўғли\",\"Каландаров Азизбек Анварбекович\",\"Насруллоев Ҳаётжон Хабибуллоевич\",\"Мирзахакимов Акмалбек Сойибжонович\",\"Усенов Бобур Марат ўғли\",\"Исломов Абу-Бакир Ғайрат ўғли\",\"Рахимжонов Жамшидбек Ботиржон ўғли\",\"Рахимов Абдуллоҳ Жамшид ўғли\",\"Парманов Лазизбек Юсупович\",\"Ахмаджонов Илхомжон Усмонжонович\",\"Искандаров Асрор Хабибуллаевич\",\"Холказаков Азизжон Абдикарим ўғли\",\"Нормуродов Хуршид Камол ўғли\",\"Саидов Бекзод Ахмадович\",\"Исломов Камронбек Мирза ўғли\",\"Қаюмжонов Муҳаммаджон Максуд ўғли\",\"Тўхтамуродов Бобур Бозорович\",\"Жовлиев Иномжон Эркин ўғли\",\"Тошмаматов Муҳаммадумид Олимжонович\"]"
                },
                "img": "ff808181216fe1c5796e9205",
                "positions": {
                    "type": "json",
                    "value": "[\"кичик дастурчи\",\"кичик дастурчиси\",\"кичик дастурчи\",\"веб-дизайнер\",\"дастурчи\",\"таълим технологиялари ва стартап лойиҳалар бўйича директор\",\"кичик дастурчи\",\"бўлим бошлиғи\",\"дастурчи\",\"кичик дастурчиси\",\"лойиҳалар менежери\",\"Ижрочи директор\",\"лойиҳалар менежери\",\"бўлим бошлиғи\",\"веб-дизайнер\",\"веб-дизайнер\",\"дастурчи\",\"тижорат директори\",\"бўлим бошлиғи\",\"дастурчи\",\"бўлим бошлиғи\",\"бўлим бошлиғи\",\"техник директори\",\"кичик дастурчи\",\"кичик дастурчи\",\"етакчи дастурчи\",\"кичик дастурчи\",\"дастурчи\"]"
                },
                "owner_position": "лойиҳалар менежери",
                "is_favourite": false,
                "uz_members": "HASANOV AVAZBEK OLIMOVICH, O‘RALOV ZAFARJON JAHONGIR O‘G‘LI, TOSHMURODOV NODIRBEK TO‘RAQUL O‘G‘LI, ABDUVOXIDOV ABDUMALIK ABDUSALOM O‘G‘LI, O‘SKANOV JAXONGIR OYBEK O‘G‘LI, MO‘MINOV HAYDAR MUHIDDINOVICH, TASHEV ABDULAZIZ XURSHIDDINOVICH, UMAROV MUHAMMADSOLIH AHMADJON O‘G‘LI, FAYZULLAYEV HASAN AKBAR O‘G‘LI, O‘RMONOV MUHAMMADYUSUF ABDUSAMAT O‘G‘LI, KALANDAROV AZIZBEK ANVARBEKOVICH, NASRULLOYEV HAYOTJON XABIBULLOYEVICH, MIRZAXAKIMOV AKMALBEK SOYIBJONOVICH, USENOV BOBUR MARAT O‘G‘LI, ISLOMOV ABU-BAKIR G‘AYRAT O‘G‘LI, RAXIMJONOV JAMSHIDBEK BOTIRJON O‘G‘LI, RAXIMOV ABDULLOH JAMSHID O‘G‘LI, PARMANOV LAZIZBEK YUSUPOVICH, AXMADJONOV ILXOMJON USMONJONOVICH, ISKANDAROV ASROR XABIBULLAYEVICH, XOLKAZAKOV AZIZJON ABDIKARIM O‘G‘LI, NORMURODOV XURSHID KAMOL O‘G‘LI, SAIDOV BEKZOD AXMADOVICH, ISLOMOV KAMRONBEK MIRZA O‘G‘LI, QAYUMJONOV MUHAMMADJON MAKSUD O‘G‘LI, TO‘XTAMURODOV BOBUR BOZOROVICH, JOVLIYEV INOMJON ERKIN O‘G‘LI, TOSHMAMATOV MUHAMMADUMID OLIMJONOVICH",
                "owner_name1": "NURULLAYEV ZAFAR",
                "is_project_admin": false,
                "staff_id": "01d4b6bb-8a2c-4f42-8bbe-e0b3e969ee07",
                "member_ids": "{'1e67df42-e366-4a9e-86b6-a6e6cfabf8b4','b1fefdb6-67ff-416f-8985-3d362a021434','f2d04baa-50cc-4bae-88c7-1252278bb30d','65e0f5b2-d0da-41e9-b983-86889e013c99','cc63ae8d-bdb3-4056-a923-71afdc693fb6','4eccb38a-86cf-4f32-b293-61083d02a26a','dcd9f4e2-d165-4302-a20e-4f5a58acd980','5d55145e-9587-4075-82f0-21042fcda1ed','43cc5bb0-44b3-4bb7-a8b9-d47b1ccf32b6','533b5dd0-13b8-4757-abb6-d3fd3b3ea2f0','b55b4ec0-11ec-6708-990d-bf7900f4ed14','9eef797a-0f99-45a9-81bb-f919fdc83089','8d6f38a5-818f-4dcf-aac9-4bdf7b6bcc98','8f38c19a-0fbb-42b1-ac2d-675d7cd7cf73','c750b8f1-014f-2c64-c940-2a6bb4f1af66','44758b25-3b9c-4b56-8b22-241775980eee','f72713f0-5d19-336c-f54d-898ddebb421b','0dd2873a-7c3e-4368-8d36-92075eec6da3','e5ceef20-c5e1-4009-8fc8-cc3a000bfb9a','45a13f56-752d-47f8-a3a0-a207ebdd392d','0b2956d0-7db7-4150-9d7c-5351374fd52c','4e8b3eed-7421-4059-982f-f018124a9343','604d142f-fea0-4296-87d6-ede7024b7375','33e1db39-20f2-4dab-acb4-123c535b3566','4ca88e6b-da80-4717-9be5-cff3adbd00da','b4bf363d-f086-15e7-a35c-68fb17d01e09','01d4b6bb-8a2c-4f42-8bbe-e0b3e969ee07','b477c011-64f4-44c0-9ac5-40e0f9fec78a'}",
                "status": "ACTIVE"
            }
        ];

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<template>
  <div class="p-3">
    <h3 class="w-full text-center " style="font-size: 24px">Your projects </h3>
    <div class="project_container">
      <ProjectCard :project="project" v-for="(project, index) in projectLists" :key="index" class=""/>
    </div>
    <div class="w-full flex justify-end">
      <ElButton button-text="Add new project">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 24px; height: 24px;">
          <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
        </svg>
      </ElButton>
    </div>

  </div>
</template>

<style scoped>


button {
  padding: 0.5rem 1rem;
  margin: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #007bff;
  color: white;
}

.project_container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>
