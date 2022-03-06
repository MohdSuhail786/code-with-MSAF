export default function PracticeBanner() {

    return (
        <>
        <div class="l-banner-4 m-header-one jumbotron-fluid mt-5 py-3">
        <div class="d-flex practice-container l-header mx-auto justify-content-between align-items-center" style={{height:'auto'}}>
            <div className="w-50 practice-left">
                <h1 class="display-6">Practice</h1>
                <p class="lead" style={{textAlign:"justify"}}>Try your hand at one of the practice problems, and submit your solution in the language of your choice. Get better, and better prepare yourself for the competitions.</p>
            </div>
            <img src="https://cdn.codechef.com/images/practice/practice.svg" alt="Practice banner"></img>
        </div>
        </div>
        </>
    )
}