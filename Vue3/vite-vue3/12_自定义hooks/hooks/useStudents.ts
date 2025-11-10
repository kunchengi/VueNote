import axios from 'axios'
import { reactive, onMounted } from 'vue'
// 自定义hooks：将所有学生列表相关的操作封装到一起
export default function useStudents() {
    const students:any[] = reactive([])
    onMounted(() => {
        async function init(): Promise<void> {
            const studentList = await getStudents();
            students.push(...studentList);
        }
        init()
    })
    // 获取学生列表
    async function getStudents(): Promise<any[]> {
        try {
            const res = await axios.get('/api1/students')
            return res.data;
        } catch (error) {
            console.error('获取学生列表失败：', error)
            return []
        }
    }
    // 添加一个学生
    function addStudent() {
        students.push({
        id: students.length + 1,
        name: '新学生'+(students.length + 1),
        age: 18
        })
    }
    function saveStudents() {
        // 保存学生列表到服务器
        console.log('保存学生列表到服务器：', students);
    }
    // 返回需要对外暴露的数据和方法
    return {
        students,
        addStudent,
        saveStudents
    }
}