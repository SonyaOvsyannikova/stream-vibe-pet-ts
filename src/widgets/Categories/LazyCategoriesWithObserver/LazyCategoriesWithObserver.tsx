import {lazy, Suspense} from 'react';
import {useInView} from "react-intersection-observer";


const LazyCategories = lazy(() => {

    return (
        import('@/widgets/Categories/Categories.tsx')
            .then(module => {
                console.log('Загрузка категорий', performance.now())
                return module
            })
            .catch(error => {
                console.log('Категории не загружены ', error)
                throw error;
            })
    )
})


const LazyCategoriesWithObserver = (props) => {


    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '100px 0px',
    })

    return (
        <div ref = {ref}>
            {inView ? (
                <Suspense fallback={<> </>}>
                    <LazyCategories {...props} />
                </Suspense>
            ) :
            (<>Загрузочка ....</>)}
        </div>
    );
};

export default LazyCategoriesWithObserver;