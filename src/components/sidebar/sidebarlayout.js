import AdminRoute from "../adminroute";
import Venue from "../venues/venue.component";
import { Cities } from "../cities/cities-view.component";
import { Route } from "react-router-dom";
import Post from "../post/post.component";
import AccountView from "../account/account-view.component";
import SendMail from "../mail/sendmail.component";
import SendMailHolders from "../mail/sendmailtoticketholders";
import SendNewsletters from "../mail/sendnewsletter.component";
import Sidebar from "./sidebarr.component";
import AllEvents from "../events/allevents.component";
import Profile from "../account/profile.component";
import Users from "../users/users.component";
import AdminRegistrate from "../registrate/admin-registarte";
import OrganizersRegistrate from "../registrate/organizers-registrate";
const SidebarLayout = () => (
  <div className="view-account">
    <section className="module">
      <div className="module-inner">
        <Sidebar></Sidebar>

        <div className="content-panel ">
          {window.location.pathname != "/" ? (
            <>
              <AdminRoute path="/allevents" component={AllEvents} />
              <Route path="/post-admin" component={Post} />
              <AdminRoute path="/venue" component={Venue} />
              <AdminRoute path="/city" component={Cities} />
              <AdminRoute path="/editacc" component={AccountView} />
              <AdminRoute path="/mail" component={SendMail} />
              <AdminRoute path="/newslett" component={SendNewsletters} />
              <AdminRoute path="/mailtic" component={SendMailHolders} />
              <AdminRoute path="/users" component={Users} />
              <AdminRoute path="/registrateadmin" component={AdminRegistrate} />
              <AdminRoute
                path="/registrateorg"
                component={OrganizersRegistrate}
              />
            </>
          ) : (
            <AdminRoute path="/" component={Profile} />
          )}
        </div>
      </div>
    </section>
  </div>
);
export default SidebarLayout;
